const validSources = ['*.yt.nico.dev', '*.localhost'];
const url = 'https://analytics.sayhello.agency/';
const siteID = '6';
const _paq = window._paq || [];
_paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
_paq.push(['setDomains', validSources]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

export const matomoInit = () => {
  _paq.push(['setTrackerUrl', url + 'matomo.php']);
  _paq.push(['setSiteId', siteID]);
  const d = document,
    g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.defer = true;
  g.src = url + 'matomo.js';
  s.parentNode.insertBefore(g, s);
};

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
