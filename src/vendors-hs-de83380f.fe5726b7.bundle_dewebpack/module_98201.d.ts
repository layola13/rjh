/**
 * Muted icon definition (outlined theme)
 * Represents a muted/silent state icon, typically used for audio controls
 */
declare const _default: {
    /**
     * SVG icon configuration
     */
    icon: {
        /**
         * Root SVG element tag
         */
        tag: "svg";
        
        /**
         * SVG root attributes
         */
        attrs: {
            /**
             * SVG fill rule for path rendering
             */
            "fill-rule": "evenodd";
            
            /**
             * SVG viewBox coordinates and dimensions
             */
            viewBox: "64 64 896 896";
            
            /**
             * Prevents keyboard focus on the SVG element
             */
            focusable: "false";
        };
        
        /**
         * Child elements of the SVG
         */
        children: Array<{
            /**
             * SVG path element tag
             */
            tag: "path";
            
            /**
             * Path element attributes
             */
            attrs: {
                /**
                 * SVG path data defining the muted icon shape
                 */
                d: string;
            };
        }>;
    };
    
    /**
     * Icon identifier name
     */
    name: "muted";
    
    /**
     * Icon visual theme variant
     */
    theme: "outlined";
};

export default _default;