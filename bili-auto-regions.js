const Group = 'BiliRegion';
const CN = 'DIRECT';
const HK = 'ProxySnell';
const current = $surge.selectGroupDetails().decisions[Group];

if (typeof($response) !== 'undefined') {
	const raw = JSON.parse($response.body);
	const data = raw.data || raw.result || {};
	const area = (/\u50c5[\u4e00-\u9fa5]*\u6e2f/.test(data.title) || /\u50c5[\u4e00-\u9fa5]*\u6e2f/.test(data.season_title)) ? (current != HK ? HK : null) : (current != CN ? CN : null);
	(area && $surge.setSelectGroupPolicy(Group, area)) ? $done() : $done({});
} else {
	const raw = $request.url;
	const area = /%20%E6%B8%AF&/.test(raw) ? (current != HK ? HK : null) : (current != CN ? CN : null);
	if (area) $surge.setSelectGroupPolicy(Group, area);
	$done({ url: raw.replace(/%20(%E6%B8%AF|%E4%B8%AD)&/g, '&') });
}
