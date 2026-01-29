interface SVGPanOptions {
  enablePan: boolean;
  enableZoom: boolean;
  enableDrag: boolean;
  zoomScale: number;
}

interface Point {
  x: number;
  y: number;
}

declare global {
  interface Window {
    HSApp?: {
      Util?: {
        UserAgent?: {
          isIE: () => boolean;
        };
      };
    };
    hsw?: {
      plugin?: {
        underlayimg?: {
          Util?: {
            updatePoints: (element: SVGElement, value: number) => void;
          };
        };
      };
    };
  }
}

interface JQuery {
  svgPan(
    viewportId: string,
    enablePan?: boolean,
    enableZoom?: boolean,
    enableDrag?: boolean,
    zoomScale?: number
  ): JQuery;
}

(function ($: JQueryStatic): void {
  $.fn.svgPan = function (
    viewportId: string,
    enablePan: boolean = true,
    enableZoom: boolean = true,
    enableDrag: boolean = false,
    zoomScale: number = 0.2
  ): JQuery {
    return $.each(this, (_index: number, element: Element): void => {
      const $svg = $(element);

      if ($svg.is('svg') && $svg.data('SVGPan') === true) {
        const viewport = $svg.find(`#${viewportId}`)[0] as SVGGraphicsElement;

        if (!viewport) {
          throw new Error(`Could not find viewport with id #${viewportId}`);
        }

        initializeSVGPan(
          $svg[0] as SVGSVGElement,
          viewport,
          enablePan,
          enableZoom,
          enableDrag,
          zoomScale
        );
      }
    });
  };

  function initializeSVGPan(
    svg: SVGSVGElement,
    viewport: SVGGraphicsElement,
    enablePan: boolean,
    enableZoom: boolean,
    enableDrag: boolean,
    zoomScale: number
  ): void {
    let dragTarget: SVGElement | null = null;
    let startPoint: DOMPoint;
    let viewportCTMInverse: DOMMatrix;
    let mouseState = 0;

    const $svg = $(svg);
    const $parent = $svg.parent();
    let svgOffset = $svg.offset()!;
    const hasLargeOffset = Math.abs($svg.offset()!.left) > 100000;
    let isMouseInside = false;

    const getMousePoint = (event: MouseEvent | WheelEvent): DOMPoint => {
      const point = svg.createSVGPoint();

      let offsetX = (event as any).offsetX ?? event.pageX - $(event.target as Element).offset()!.left;
      let offsetY = (event as any).offsetY ?? event.pageY - $(event.target as Element).offset()!.top;

      if (window.HSApp?.Util?.UserAgent?.isIE()) {
        offsetX = event.pageX - $parent.offset()!.left;
        offsetY = event.pageY - $parent.offset()!.top;
      }

      if (offsetX === undefined || offsetY === undefined) {
        const offset = hasLargeOffset ? $parent.offset()! : svgOffset;
        offsetX = event.pageX - offset.left;
        offsetY = event.pageY - offset.top;
      }

      point.x = offsetX;
      point.y = offsetY;

      return point;
    };

    const setMatrix = (element: SVGGraphicsElement, matrix: DOMMatrix): void => {
      const matrixString = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;
      element.setAttribute('transform', matrixString);
    };

    const handleWheel = (event: WheelEvent): void => {
      if (!enableZoom || !isMouseInside) {
        return;
      }

      event.preventDefault?.();
      (event as any).returnValue = false;
      svgOffset = $svg.offset()!;

      const delta = (event as any).wheelDelta ? (event as any).wheelDelta / 360 : event.detail / -9;
      const scaleFactor = Math.pow(1 + zoomScale, delta);
      const mousePoint = getMousePoint(event);
      const transformedPoint = mousePoint.matrixTransform(viewport.getCTM()!.inverse());

      const scaleMatrix = svg
        .createSVGMatrix()
        .translate(transformedPoint.x, transformedPoint.y)
        .scale(scaleFactor)
        .translate(-transformedPoint.x, -transformedPoint.y);

      const newCTM = viewport.getCTM()!.multiply(scaleMatrix);

      const MIN_SCALE = 0.8;
      const MAX_SCALE = 5;
      if (newCTM.a > MAX_SCALE || newCTM.a < MIN_SCALE) {
        return;
      }

      setMatrix(viewport, newCTM);

      if (viewportCTMInverse === undefined) {
        viewportCTMInverse = viewport.getCTM()!.inverse();
      }
      viewportCTMInverse = viewportCTMInverse.multiply(scaleMatrix.inverse());

      const noScalingElements = svg.querySelectorAll<SVGElement>('.no-scaling');
      if (noScalingElements.length > 0) {
        Array.from(noScalingElements).forEach((element: SVGElement) => {
          const UNDERLAY_POINT_SIZE = 14;
          window.hsw?.plugin?.underlayimg?.Util?.updatePoints?.(element, UNDERLAY_POINT_SIZE / newCTM.a);
          element.setAttribute('stroke-width', String(1 / newCTM.a));
        });
      }
    };

    const handleMouseMove = (event: MouseEvent): void => {
      event.preventDefault?.();
      (event as any).returnValue = false;

      let transformedPoint: DOMPoint;

      if (mouseState === 1 && enablePan) {
        transformedPoint = getMousePoint(event).matrixTransform(viewportCTMInverse);
        setMatrix(
          viewport,
          viewportCTMInverse
            .inverse()
            .translate(transformedPoint.x - startPoint.x, transformedPoint.y - startPoint.y)
        );
      } else if (mouseState === 2 && enableDrag && dragTarget) {
        transformedPoint = getMousePoint(event).matrixTransform(viewport.getCTM()!.inverse());
        setMatrix(
          dragTarget as SVGGraphicsElement,
          svg
            .createSVGMatrix()
            .translate(transformedPoint.x - startPoint.x, transformedPoint.y - startPoint.y)
            .multiply(viewport.getCTM()!.inverse())
            .multiply((dragTarget as SVGGraphicsElement).getCTM()!)
        );
        startPoint = transformedPoint;
      }
    };

    $svg
      .bind('mouseup', (event: JQuery.Event): void => {
        event.preventDefault?.();
        (event as any).returnValue = false;

        if (mouseState === 1 || mouseState === 2) {
          mouseState = 0;
        }
      })
      .bind('mousedown', (event: JQuery.Event): void => {
        event.preventDefault?.();
        (event as any).returnValue = false;

        const target = event.target as SVGElement;

        if (target.tagName !== 'svg' && enableDrag) {
          mouseState = 2;
          dragTarget = target;
          viewportCTMInverse = viewport.getCTM()!.inverse();
          startPoint = getMousePoint(event.originalEvent as MouseEvent).matrixTransform(viewportCTMInverse);
        } else {
          mouseState = 1;
          viewportCTMInverse = viewport.getCTM()!.inverse();
          startPoint = getMousePoint(event.originalEvent as MouseEvent).matrixTransform(viewportCTMInverse);
        }
      })
      .bind('mouseenter', (_event: JQuery.Event): void => {
        if (!isMouseInside) {
          svgOffset = $svg.offset()!;
          $svg.bind('mousemove', handleMouseMove);
          isMouseInside = true;
        }
      })
      .bind('mouseleave', (_event: JQuery.Event): void => {
        if (isMouseInside) {
          $svg.unbind('mousemove', handleMouseMove);
          isMouseInside = false;
        }
        mouseState = 0;
      });

    window.addEventListener('mousewheel', handleWheel as EventListener, false);
    window.addEventListener('DOMMouseScroll', handleWheel as EventListener, false);
  }
})(jQuery);