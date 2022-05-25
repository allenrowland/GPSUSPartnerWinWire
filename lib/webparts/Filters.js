var GSPUSFilterHelper = /** @class */ (function () {
    function GSPUSFilterHelper() {
    }
    GSPUSFilterHelper.prototype.GPSUSFilterHelper = function (_industry, _solutionArea, _partnerType, _storyType, _tags) {
        if (_industry === void 0) { _industry = ""; }
        if (_solutionArea === void 0) { _solutionArea = ""; }
        this.industry = _industry;
        this.solutionArea = _solutionArea;
        this.partnerType = _partnerType;
        this.storyType = _storyType;
        this.tags = _tags;
        this.filters = {
            Industry: this._parseFilters(this.industry),
            SolutionArea: this._parseFilters(this.solutionArea),
            PartnerType: this._parseFilters(this.partnerType),
            StoryType: this._parseFilters(this.storyType),
            Tags: this._parseFilters(this.tags)
        };
    };
    GSPUSFilterHelper.prototype._parseFilters = function (filtersRaw, delimiter) {
        if (delimiter === void 0) { delimiter = '|'; }
        if (filtersRaw != null && filtersRaw != "") {
            return filtersRaw.split(delimiter);
        }
        else {
            return [];
        }
    };
    GSPUSFilterHelper.prototype._filterURIString = function (_filters) {
        var filterString = "";
        _filters.forEach(function (item, i) {
            if (i > 0) {
                filterString += ',';
            }
            filterString += item;
        });
        return filterString;
    };
    GSPUSFilterHelper.prototype.createFilterURI = function () {
        var FilterFields = '&FilterField1=Industry&FilterField2=SolutionArea&FilterField3=PartnerType&FilterField4=StoryType&FilterField5=Tags';
        var IndustryFilters = '&FilterValues1=' + this._filterURIString(this.filters.Industry);
        var SolutionAreaFilters = '&FilterValues2=' + this._filterURIString(this.filters.SolutionArea);
        var PartnerTypeFilters = '&FilterValues3=' + this._filterURIString(this.filters.PartnerType);
        var StoryTypeFilters = '&FilterValues4=' + this._filterURIString(this.filters.StoryType);
        var TagsFilters = '&FilterValues5=' + this._filterURIString(this.filters.Tags);
        return FilterFields + IndustryFilters + SolutionAreaFilters + PartnerTypeFilters + StoryTypeFilters + TagsFilters;
    };
    return GSPUSFilterHelper;
}());
export { GSPUSFilterHelper };
//# sourceMappingURL=Filters.js.map