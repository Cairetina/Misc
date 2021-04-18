const Group = $persistentStore.read('BiliArea_Policy') || '哔哩哔哩';
const CN = $persistentStore.read('BiliArea_CN') || 'DIRECT';
const TW = $persistentStore.read('BiliArea_TW') || '台湾';
const HK = $persistentStore.read('BiliArea_HK') || '香港';

var obj = JSON.parse($response.body),
	obj = (obj.result || obj.data || {}).title || '';
const current = $surge.selectGroupDetails().decisions[Group] || 'Policy error ⚠️'
const str = (() => {
	if (obj.match(/\u50c5[\u4e00-\u9fa5]+\u6e2f/)) {
		if (current != HK) return HK;
	} else if (obj.match(/\u50c5[\u4e00-\u9fa5]+\u53f0/)) {
		if (current != TW) return TW;
	} else if (current != CN) return CN;
})()

if (str) {
	const change = $surge.setSelectGroupPolicy(Group, str);
	const notify = $persistentStore.read('BiliAreaNotify') === 'true';
	if (!notify) $notification.post(obj, ``, `${current}  =>  ${str}  =>  ${change?`🟢`:`🔴`}`);
	if (change) {
		$done();
	} else {
		$done({});
	}
} else {
	$done({});
}
