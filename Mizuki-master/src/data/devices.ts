// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	Phone: [
		{
			name: "VIVO X200 Pro",
			image: "/images/device/x200pro.png",
			specs: "White / 16G + 512G",
			description:
				"ZEISS Image. Go Far..",
			link: "https://www.vivo.com/en/products/x200-pro",
		},
	],
	pad: [
		{
			name: "HUAWEI MatePad air 2023",
			image: "/images/device/matepadair2023.webp",
			specs: "Gray / 8G + 256G",
			description:
				"全金属机身浑然一体，天然云母粉经过业界首创幻彩珠光工艺11精密加工,平板中的艺术品.",
			link: "https://consumer.huawei.com/cn/tablets/matepad-air-2025/",
		},
	],
    PC: [
		{
			name: "拯救者y7000p",
			image: "/images/device/y7000p.webp",
			specs: "暗夜黑 / i7-13700H / RTX 4060 / 16G + 1T",
			description:
				"全新霜刃散热系统，强悍性能释放，支持Fn+Q性能模式切换，专为电竞玩家打造的硬核游戏本.",
			link: "https://item.lenovo.com.cn/product/1046114.html?key=y7000p/",
		},
	],
smartwatch: [
		{
			name: "HUAWEI WATCH Fit 4 ",
			image: "/images/device/fit4.webp",
			specs: "Titanium Gray / 46mm",
			description:
				"华为WATCH Fit 4 ，采用钛金属表壳，搭配陶瓷表底盖，质感轻盈坚固，彰显非凡品味.",
			link: "https://consumer.huawei.com/cn/wearables/watch-fit4/",
		},
	],

};

