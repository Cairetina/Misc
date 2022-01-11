const raw = JSON.parse($response.body);
const data = raw.data || raw.result || {};

const Group = $persistentStore.read('BiliArea_Policy') || 'BiliRegion';
const CN = $persistentStore.read('BiliArea_CN') || 'DIRECT';
const HK = $persistentStore.read('BiliArea_HK') || 'ProxySnell';
const current = $surge.selectGroupDetails().decisions[Group];

const area = (() => {
	if (/\u50c5[\u4e00-\u9fa5]+\u6e2f|%20%E6%B8%AF&/.test(data.title)) {
		if (current != HK) return HK;
	} else if (current != CN) return CN;
})()

if (area) {
	const change = $surge.setSelectGroupPolicy(Group, area);
	if (change) {
		$done();
	} else {
		$done({});
	}
} else {
	$done({});
}
