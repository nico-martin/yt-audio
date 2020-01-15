let currentUrl = location.href;
export const matomoSetPage = url => {
  _paq.push(['setReferrerUrl', currentUrl]);

  currentUrl = url;
  _paq.push(['setCustomUrl', currentUrl]);
  // _paq.push(['setDocumentTitle', 'My New Title']);
  // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
  _paq.push(['deleteCustomVariables', 'page']);
  _paq.push(['setGenerationTimeMs', 0]);
  _paq.push(['trackPageView']);
  // make Matomo aware of newly added content
  const content = document.getElementById('content');
  _paq.push(['MediaAnalytics::scanForMedia', content]);
  _paq.push(['FormAnalytics::scanForForms', content]);
  _paq.push(['trackContentImpressionsWithinNode', content]);
  _paq.push(['enableLinkTracking']);
};
