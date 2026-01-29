function getCurveBeans(): unknown[] {
  return this._curveBeans.concat(this._extraCurveBeans).concat(this._tempBeans);
}