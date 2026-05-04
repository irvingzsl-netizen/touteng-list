// Firebase 配置 - 使用 REST API 方式（无需复杂配置）
const DATABASE_URL = "https://aoao-39647-default-rtdb.firebaseio.com";
let isFirebaseEnabled = true;

// 密码验证
const CORRECT_PASSWORD = '9919';

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const passwordOverlay = document.getElementById('passwordOverlay');
    const mainContent = document.getElementById('mainContent');
    
    if (passwordInput.value === CORRECT_PASSWORD) {
        // 密码正确，保存到 sessionStorage
        sessionStorage.setItem('authenticated', 'true');
        
        // 隐藏密码界面，显示主内容
        passwordOverlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // 移除密码界面
        setTimeout(() => {
            passwordOverlay.style.display = 'none';
        }, 500);
        
        // 初始化应用
        init();
    } else {
        // 密码错误
        passwordError.textContent = '❌ 密码错误，请重试';
        passwordInput.value = '';
        passwordInput.focus();
        
        // 添加抖动动画
        passwordError.style.animation = 'none';
        setTimeout(() => {
            passwordError.style.animation = 'errorShake 0.5s ease';
        }, 10);
    }
}

// 页面加载时检查认证状态
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    const passwordOverlay = document.getElementById('passwordOverlay');
    const mainContent = document.getElementById('mainContent');
    
    if (isAuthenticated) {
        // 已认证，直接显示内容
        passwordOverlay.style.display = 'none';
        mainContent.classList.remove('hidden');
        init();
    } else {
        // 未认证，显示密码界面
        mainContent.classList.add('hidden');
        
        // 设置密码输入事件
        const passwordInput = document.getElementById('passwordInput');
        const passwordSubmit = document.getElementById('passwordSubmit');
        
        passwordSubmit.addEventListener('click', checkPassword);
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        
        // 自动聚焦到密码输入框
        setTimeout(() => {
            passwordInput.focus();
        }, 500);
    }
}

// 初始数据 - 完整的107个项目
let items = [
    {id: 1, space: "全屋", category: "系统设备", item: "中央空调/风管机", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 2, space: "全屋", category: "系统设备", item: "普通壁挂/柜机空调", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 3, space: "全屋", category: "系统设备", item: "新风系统/壁挂新风", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 4, space: "全屋", category: "系统设备", item: "地暖/暖气片", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 5, space: "全屋", category: "水处理", item: "前置过滤器", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 6, space: "全屋", category: "水处理", item: "净水器/直饮机", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 7, space: "全屋", category: "水处理", item: "软水机", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 8, space: "全屋", category: "网络/智能", item: "弱电箱扩容/网络面板", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 9, space: "全屋", category: "网络/智能", item: "路由器/Mesh/AP", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 10, space: "全屋", category: "网络/智能", item: "智能开关/网关/传感器", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 11, space: "全屋", category: "灯具照明", item: "全屋主灯/筒灯/射灯/灯带", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 12, space: "全屋", category: "五金电气", item: "开关插座面板", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 13, space: "全屋", category: "定制/收纳", item: "全屋定制柜", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 14, space: "全屋", category: "软装", item: "窗帘轨道/罗马杆", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 15, space: "全屋", category: "安全", item: "烟雾/燃气报警器", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 16, space: "全屋", category: "安全", item: "家用灭火器/灭火毯", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 17, space: "全屋", category: "清洁/工具", item: "甲醛检测/空气治理", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 18, space: "全屋", category: "服务", item: "宽带/水电燃气开通", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 19, space: "玄关", category: "家具", item: "鞋柜", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 20, space: "玄关", category: "家具", item: "换鞋凳", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 21, space: "玄关", category: "软装", item: "全身镜/穿衣镜", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 22, space: "玄关", category: "小件/用品", item: "钥匙托盘/挂钩/雨伞架", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 23, space: "玄关", category: "网络/智能", item: "智能门锁", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 24, space: "玄关", category: "软装", item: "入户地垫", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 25, space: "客厅", category: "家具", item: "沙发", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 26, space: "客厅", category: "家具", item: "茶几/边几", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 27, space: "客厅", category: "家具", item: "电视柜/收纳柜", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 28, space: "客厅", category: "家电", item: "电视", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 29, space: "客厅", category: "家电", item: "投影仪/幕布", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 30, space: "客厅", category: "家电", item: "音响/回音壁", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 31, space: "客厅", category: "软装", item: "客厅窗帘", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 32, space: "客厅", category: "软装", item: "地毯", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 33, space: "客厅", category: "软装", item: "装饰画/摆件/绿植", priority: "可延后", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 34, space: "客厅", category: "家电", item: "扫地机器人", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 35, space: "客厅", category: "家电", item: "空气净化器", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 36, space: "餐厅", category: "家具", item: "餐桌", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 37, space: "餐厅", category: "家具", item: "餐椅", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 38, space: "餐厅", category: "家具", item: "餐边柜", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 39, space: "餐厅", category: "灯具照明", item: "餐桌吊灯", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 40, space: "餐厅", category: "家电", item: "咖啡机/饮水机/管线机", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 41, space: "餐厅", category: "软装", item: "桌布/餐垫/餐具收纳", priority: "可延后", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 42, space: "厨房", category: "家电", item: "冰箱", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 43, space: "厨房", category: "家电", item: "油烟机", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 44, space: "厨房", category: "家电", item: "燃气灶/电磁灶", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 45, space: "厨房", category: "家电", item: "洗碗机", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 46, space: "厨房", category: "家电", item: "蒸烤箱/蒸烤一体机", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 47, space: "厨房", category: "家电", item: "微波炉", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 48, space: "厨房", category: "家电", item: "电饭煲", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 49, space: "厨房", category: "家电", item: "空气炸锅/电压力锅", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 50, space: "厨房", category: "家电", item: "电热水壶/养生壶", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""}
];

let sortOrder = 'asc';

// 继续添加项目51-107
items.push(
    {id: 51, space: "厨房", category: "家电", item: "破壁机/料理机", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 52, space: "厨房", category: "洁具", item: "水槽/龙头", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 53, space: "厨房", category: "五金电气", item: "厨房置物架/挂杆/调味拉篮", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 54, space: "厨房", category: "小件/用品", item: "锅具/刀具/砧板", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 55, space: "厨房", category: "小件/用品", item: "餐具/杯具", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 56, space: "厨房", category: "小件/用品", item: "厨房垃圾桶/分类桶", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 57, space: "主卧", category: "家具", item: "床架", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 58, space: "主卧", category: "家具", item: "床垫", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 59, space: "主卧", category: "家具", item: "床头柜", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 60, space: "主卧", category: "家具", item: "衣柜/衣帽间", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 61, space: "主卧", category: "家具", item: "梳妆台/斗柜", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 62, space: "主卧", category: "软装", item: "卧室窗帘", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 63, space: "主卧", category: "软装", item: "床品四件套/被芯/枕头", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 64, space: "主卧", category: "灯具照明", item: "床头灯/阅读灯", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 65, space: "主卧", category: "家电", item: "卧室空调", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 66, space: "次卧/儿童房", category: "家具", item: "次卧床/儿童床", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 67, space: "次卧/儿童房", category: "家具", item: "床垫", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 68, space: "次卧/儿童房", category: "家具", item: "书桌/学习桌", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 69, space: "次卧/儿童房", category: "家具", item: "人体工学椅/学习椅", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 70, space: "次卧/儿童房", category: "家具", item: "书柜/玩具收纳", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 71, space: "次卧/儿童房", category: "灯具照明", item: "护眼台灯", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 72, space: "书房", category: "家具", item: "办公桌", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 73, space: "书房", category: "家具", item: "办公椅", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 74, space: "书房", category: "家电", item: "打印机/文件柜", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 75, space: "卫生间", category: "洁具", item: "马桶", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 76, space: "卫生间", category: "洁具", item: "智能马桶/智能马桶盖", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 77, space: "卫生间", category: "家具", item: "浴室柜/镜柜", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 78, space: "卫生间", category: "洁具", item: "花洒/恒温花洒", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 79, space: "卫生间", category: "家电", item: "浴霸/暖风机", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 80, space: "卫生间", category: "家电", item: "热水器", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 81, space: "卫生间", category: "家电", item: "电热毛巾架", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 82, space: "卫生间", category: "五金电气", item: "地漏/角阀/下水器", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 83, space: "卫生间", category: "五金电气", item: "毛巾架/纸巾架/置物架", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 84, space: "卫生间", category: "小件/用品", item: "浴室防滑垫/垃圾桶/清洁刷", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 85, space: "阳台/洗衣区", category: "家电", item: "洗衣机", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 86, space: "阳台/洗衣区", category: "家电", item: "烘干机/洗烘套装", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 87, space: "阳台/洗衣区", category: "家具", item: "洗衣柜/阳台柜", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 88, space: "阳台/洗衣区", category: "五金电气", item: "电动晾衣架", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 89, space: "阳台/洗衣区", category: "家电", item: "吸尘器/洗地机", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 90, space: "阳台/洗衣区", category: "洁具", item: "拖把池/清洁工具柜", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 91, space: "阳台/洗衣区", category: "软装", item: "绿植架/休闲椅", priority: "可延后", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 92, space: "储物/工具", category: "清洁/工具", item: "家用工具箱", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 93, space: "储物/工具", category: "清洁/工具", item: "折叠梯/人字梯", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 94, space: "储物/工具", category: "五金电气", item: "插线板/延长线", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 95, space: "储物/工具", category: "定制/收纳", item: "收纳盒/标签机", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 96, space: "储物/工具", category: "安全", item: "保险柜/重要文件收纳", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 97, space: "软装", category: "软装", item: "全屋地毯/门垫/厨房垫", priority: "按需", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 98, space: "软装", category: "软装", item: "抱枕/靠垫/毯子", priority: "可延后", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 99, space: "软装", category: "软装", item: "挂钟/装饰画/摆件", priority: "可延后", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 100, space: "软装", category: "软装", item: "香薰/扩香/空气清新", priority: "可延后", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 101, space: "生活用品", category: "小件/用品", item: "垃圾桶/垃圾袋", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 102, space: "生活用品", category: "清洁/工具", item: "清洁剂/抹布/刷子", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 103, space: "生活用品", category: "清洁/工具", item: "扫把/拖把/刮水器", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 104, space: "生活用品", category: "小件/用品", item: "衣架/裤架/晒衣夹", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 105, space: "生活用品", category: "小件/用品", item: "拖鞋/浴室拖鞋", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 106, space: "生活用品", category: "小件/用品", item: "纸巾/洗衣液/洗手液/沐浴用品", priority: "必买", status: "未开始", budget: 0, brand: "", note: ""},
    {id: 107, space: "生活用品", category: "小件/用品", item: "家庭药箱/急救包", priority: "重要", status: "未开始", budget: 0, brand: "", note: ""}
);

// 保存数据到 Firebase（使用 REST API）
async function saveData() {
    // 同时保存到本地，确保不丢失
    localStorage.setItem('renovationItems', JSON.stringify(items));
    
    try {
        console.log('📤 正在保存到云端...', `${DATABASE_URL}/items.json`);
        const response = await fetch(`${DATABASE_URL}/items.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        });
        
        console.log('📡 响应状态:', response.status, response.statusText);
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ 数据已保存到云端', result);
        } else {
            const errorText = await response.text();
            console.error('❌ 云端保存失败:', response.status, errorText);
            console.warn('⚠️ 云端保存失败，但本地已保存');
        }
    } catch (error) {
        console.error('❌ 保存错误详情:', error);
        console.warn('⚠️ 无法连接云端，数据已保存到本地:', error.message);
    }
}

// 从 Firebase 加载数据
async function loadData() {
    // 先从本地加载，确保有数据
    const saved = localStorage.getItem('renovationItems');
    if (saved) {
        items = JSON.parse(saved);
        console.log('📂 从本地加载了', items.length, '条数据');
    }
    
    try {
        const response = await fetch(`${DATABASE_URL}/items.json`);
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
            items = data;
            localStorage.setItem('renovationItems', JSON.stringify(items));
            console.log('✅ 从云端加载了', items.length, '条数据');
        } else if (items.length > 0) {
            // 云端没数据，上传本地数据
            console.log('📤 上传本地数据到云端...');
            await saveData();
        }
    } catch (error) {
        console.warn('⚠️ 无法连接云端，使用本地数据:', error.message);
    }
    
    // 迁移旧数据
    items.forEach(item => {
        if (item.status === '已买/已完成') {
            item.status = '已完成';
        } else if (item.status === '已列入预算' || item.status === '比价中' || item.status === '已下单') {
            item.status = item.brand && item.brand.trim() !== '' ? '纠结中' : '未开始';
        }
    });
}

// 实时监听数据变化
function startRealtimeSync() {
    setInterval(async () => {
        try {
            const response = await fetch(`${DATABASE_URL}/items.json`);
            const data = await response.json();
            
            if (data && Array.isArray(data) && JSON.stringify(data) !== JSON.stringify(items)) {
                items = data;
                reindexItems();
                updateDashboard();
                updateSpaceSummary();
                updateFilterOptions();
                renderTable();
                console.log('🔄 检测到数据更新，已同步');
            }
        } catch (error) {
            console.error('同步失败:', error);
        }
    }, 3000); // 每3秒检查一次更新
}

// 初始化
async function init() {
    await loadData();
    reindexItems();
    updateDashboard();
    updateSpaceSummary();
    updateFilterOptions();
    renderTable();
    setupFilters();
    
    // 启动实时同步
    startRealtimeSync();
    console.log('🚀 应用已启动，实时同步已开启');
}

// 动态更新筛选器选项
function updateFilterOptions() {
    // 获取所有唯一的空间
    const spaces = [...new Set(items.map(item => item.space))].sort();
    const spaceFilter = document.getElementById('spaceFilter');
    const currentSpaceValue = spaceFilter.value;
    spaceFilter.innerHTML = '<option value="all">全部空间</option>';
    spaces.forEach(space => {
        const option = document.createElement('option');
        option.value = space;
        option.textContent = space;
        spaceFilter.appendChild(option);
    });
    // 恢复之前的选择（如果还存在）
    if (spaces.includes(currentSpaceValue)) {
        spaceFilter.value = currentSpaceValue;
    }
    
    // 获取所有唯一的大类
    const categories = [...new Set(items.map(item => item.category))].sort();
    const categoryFilter = document.getElementById('categoryFilter');
    const currentCategoryValue = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="all">全部大类</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    // 恢复之前的选择（如果还存在）
    if (categories.includes(currentCategoryValue)) {
        categoryFilter.value = currentCategoryValue;
    }
    
    // 获取所有唯一的状态
    const statuses = [...new Set(items.map(item => item.status))].sort();
    const statusFilter = document.getElementById('statusFilter');
    const currentStatusValue = statusFilter.value;
    statusFilter.innerHTML = '<option value="all">全部状态</option>';
    statuses.forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        statusFilter.appendChild(option);
    });
    // 恢复之前的选择（如果还存在）
    if (statuses.includes(currentStatusValue)) {
        statusFilter.value = currentStatusValue;
    }
}

// 更新仪表板
function updateDashboard() {
    const total = items.length;
    const completed = items.filter(item => item.status === '已完成').length;
    const inProgress = items.filter(item => item.status === '纠结中').length;
    const totalBudget = items.reduce((sum, item) => sum + (item.budget || 0), 0);
    
    const mustBuy = items.filter(item => item.priority === '必买');
    const important = items.filter(item => item.priority === '重要');
    const optional = items.filter(item => item.priority === '按需');
    const later = items.filter(item => item.priority === '可延后');
    
    document.getElementById('totalProjects').textContent = total;
    document.getElementById('completedProjects').textContent = completed;
    document.getElementById('inProgressProjects').textContent = inProgress;
    document.getElementById('totalBudget').textContent = `¥${totalBudget.toLocaleString()}`;
    
    document.getElementById('mustBuyCount').textContent = mustBuy.length;
    document.getElementById('mustBuyCompleted').textContent = mustBuy.filter(item => item.status === '已完成').length;
    document.getElementById('importantCount').textContent = important.length;
    document.getElementById('importantCompleted').textContent = important.filter(item => item.status === '已完成').length;
    document.getElementById('optionalCount').textContent = optional.length;
    document.getElementById('laterCount').textContent = later.length;
}

// 更新空间汇总
function updateSpaceSummary() {
    const spaces = {};
    
    items.forEach(item => {
        if (!spaces[item.space]) {
            spaces[item.space] = {
                count: 0,
                budget: 0,
                completed: 0
            };
        }
        spaces[item.space].count++;
        spaces[item.space].budget += item.budget || 0;
        if (item.status === '已完成') {
            spaces[item.space].completed++;
        }
    });
    
    const spaceGrid = document.getElementById('spaceGrid');
    spaceGrid.innerHTML = '';
    
    Object.keys(spaces).sort().forEach(spaceName => {
        const space = spaces[spaceName];
        
        const card = document.createElement('div');
        card.className = 'space-card';
        card.innerHTML = `
            <h3>${spaceName}</h3>
            <div class="space-info">
                <div class="space-info-row">
                    <span class="space-info-label">项目数</span>
                    <span class="space-info-value">${space.count}</span>
                </div>
                <div class="space-info-row">
                    <span class="space-info-label">已完成</span>
                    <span class="space-info-value">${space.completed}</span>
                </div>
                <div class="space-info-row">
                    <span class="space-info-label">预期花费</span>
                    <span class="space-info-value">¥${space.budget.toLocaleString()}</span>
                </div>
            </div>
        `;
        spaceGrid.appendChild(card);
    });
}

// 渲染表格
function renderTable(filteredItems = null) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    const itemsToRender = filteredItems || items;
    
    itemsToRender.forEach(item => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', item.id);
        tr.innerHTML = `
            <td>${item.id}</td>
            <td class="editable-cell" onclick="quickEditField(${item.id}, 'space', this, 'text')">${item.space}</td>
            <td class="editable-cell" onclick="quickEditField(${item.id}, 'category', this, 'text')">${item.category}</td>
            <td class="editable-cell" onclick="quickEditField(${item.id}, 'item', this, 'text')"><strong>${item.item}</strong></td>
            <td class="editable-cell" onclick="quickEditField(${item.id}, 'priority', this, 'select')">
                <span class="priority-badge priority-${item.priority}">${item.priority}</span>
            </td>
            <td class="editable-cell" onclick="quickEditField(${item.id}, 'status', this, 'select')">
                <span class="status-badge status-${item.status}">${item.status}</span>
            </td>
            <td class="editable-cell" onclick="quickEditField(${item.id}, 'budget', this, 'number')">¥${(item.budget || 0).toLocaleString()}</td>
            <td class="editable-cell brand-cell" onclick="quickEditField(${item.id}, 'brand', this, 'textarea')">${item.brand || ''}</td>
            <td class="editable-cell note-cell" onclick="quickEditField(${item.id}, 'note', this, 'textarea')">${item.note || ''}</td>
            <td>
                <button class="btn-delete" onclick="deleteItem(${item.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 通用的快速编辑功能
function quickEditField(id, field, element, type) {
    // 防止重复编辑
    if (element.querySelector('.quick-edit-input')) {
        return;
    }
    
    // 添加点击动画
    element.classList.add('clicking');
    setTimeout(() => element.classList.remove('clicking'), 300);
    
    // 创建涟漪效果
    createRipple(element, event);
    
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    const currentValue = item[field] || '';
    let input;
    let isSaving = false; // 防止重复保存
    
    if (type === 'select') {
        input = document.createElement('select');
        input.className = 'quick-edit-input';
        
        if (field === 'priority') {
            const priorities = ['必买', '重要', '按需', '可延后'];
            priorities.forEach(p => {
                const option = document.createElement('option');
                option.value = p;
                option.textContent = p;
                option.selected = p === currentValue;
                input.appendChild(option);
            });
        } else if (field === 'status') {
            const statuses = ['未开始', '纠结中', '已决定', '已完成'];
            statuses.forEach(s => {
                const option = document.createElement('option');
                option.value = s;
                option.textContent = s;
                option.selected = s === currentValue;
                input.appendChild(option);
            });
        }
    } else if (type === 'textarea') {
        input = document.createElement('textarea');
        input.value = currentValue;
        input.className = 'quick-edit-input';
        input.rows = 2;
        
        // 自动调整高度
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // 初始化高度
        setTimeout(() => {
            input.style.height = 'auto';
            input.style.height = (input.scrollHeight) + 'px';
        }, 0);
    } else if (type === 'number') {
        input = document.createElement('input');
        input.type = 'number';
        input.value = currentValue;
        input.className = 'quick-edit-input';
        input.min = 0;
    } else {
        input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.className = 'quick-edit-input';
    }
    
    input.style.width = '100%';
    
    // 保存原始内容
    const originalContent = element.innerHTML;
    
    // 添加淡出动画
    element.style.opacity = '0.5';
    setTimeout(() => {
        element.innerHTML = '';
        element.appendChild(input);
        element.style.opacity = '1';
    }, 100);
    
    // 延迟聚焦，确保动画完成
    setTimeout(() => {
        input.focus();
    }, 150);
    
    function saveEdit() {
        if (isSaving) return;
        isSaving = true;
        
        const oldValue = item[field];
        let newValue;
        
        if (type === 'number') {
            newValue = parseFloat(input.value) || 0;
        } else {
            newValue = input.value;
        }
        
        // 只有值改变时才保存和更新
        if (oldValue !== newValue) {
            item[field] = newValue;
            
            // 如果修改了品牌字段，自动更新状态
            if (field === 'brand') {
                if (newValue.trim() !== '' && item.status === '未开始') {
                    item.status = '纠结中';
                } else if (newValue.trim() === '' && item.status === '纠结中') {
                    item.status = '未开始';
                }
            }
            
            saveData();
            
            // 添加保存动画
            element.style.opacity = '0.5';
            setTimeout(() => {
                updateCellDisplay(element, field, newValue);
                element.style.opacity = '1';
                // 添加成功提示动画
                element.classList.add('cell-saved');
                setTimeout(() => element.classList.remove('cell-saved'), 500);
            }, 100);
            
            // 如果修改了品牌，需要重新渲染整行以更新状态显示
            if (field === 'brand') {
                setTimeout(() => {
                    const filtered = getCurrentFilteredItems();
                    renderTable(filtered);
                }, 200);
            }
            
            // 只在必要时更新统计
            if (field === 'status' || field === 'priority' || field === 'budget') {
                updateDashboard();
                updateSpaceSummary();
            }
        } else {
            // 值没变，只恢复显示
            element.style.opacity = '0.5';
            setTimeout(() => {
                updateCellDisplay(element, field, oldValue);
                element.style.opacity = '1';
            }, 100);
        }
    }
    
    function cancelEdit() {
        element.style.opacity = '0.5';
        setTimeout(() => {
            element.innerHTML = originalContent;
            element.style.opacity = '1';
        }, 100);
    }
    
    // 下拉框特殊处理
    if (type === 'select') {
        // 监听选择变化，立即保存
        input.addEventListener('change', () => {
            saveEdit();
        });
        
        // 点击选项后也会触发blur，但我们已经在change中保存了
        input.addEventListener('blur', () => {
            // 延迟一点，确保change事件先触发
            setTimeout(() => {
                if (!isSaving) {
                    // 如果没有通过change保存（比如按了ESC），则取消
                    cancelEdit();
                }
            }, 50);
        });
    } else {
        // 非下拉框的处理
        input.addEventListener('blur', () => {
            setTimeout(saveEdit, 100);
        });
        
        if (type !== 'textarea') {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });
        }
    }
    
    // ESC键取消编辑
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            isSaving = true; // 标记为已处理，防止blur再次触发
            cancelEdit();
        }
    });
}

// 创建涟漪效果
function createRipple(element, e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e ? e.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
    const y = e ? e.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 更新单个单元格的显示
function updateCellDisplay(element, field, value) {
    if (field === 'priority') {
        element.innerHTML = `<span class="priority-badge priority-${value}">${value}</span>`;
    } else if (field === 'status') {
        element.innerHTML = `<span class="status-badge status-${value}">${value}</span>`;
    } else if (field === 'budget') {
        element.innerHTML = `¥${(value || 0).toLocaleString()}`;
    } else if (field === 'item') {
        element.innerHTML = `<strong>${value}</strong>`;
    } else if (field === 'brand' || field === 'note') {
        // 保留换行符，使用 textContent 然后设置 white-space: pre-wrap
        element.textContent = value || '';
    } else {
        element.innerHTML = value || '';
    }
    
    // 如果修改了空间、大类或状态，更新筛选器选项
    if (field === 'space' || field === 'category' || field === 'status') {
        updateFilterOptions();
    }
}

// 筛选功能
function setupFilters() {
    const spaceFilter = document.getElementById('spaceFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchInput');
    
    window.currentFilters = {
        space: 'all',
        category: 'all',
        status: 'all',
        search: ''
    };
    
    function applyFilters() {
        let filtered = items;
        
        if (spaceFilter.value !== 'all') {
            filtered = filtered.filter(item => item.space === spaceFilter.value);
        }
        
        if (categoryFilter.value !== 'all') {
            filtered = filtered.filter(item => item.category === categoryFilter.value);
        }
        
        if (statusFilter.value !== 'all') {
            filtered = filtered.filter(item => item.status === statusFilter.value);
        }
        
        if (searchInput.value.trim()) {
            const search = searchInput.value.trim().toLowerCase();
            filtered = filtered.filter(item => 
                item.item.toLowerCase().includes(search) ||
                item.category.toLowerCase().includes(search) ||
                item.brand.toLowerCase().includes(search) ||
                item.note.toLowerCase().includes(search)
            );
        }
        
        // 保存当前筛选状态
        window.currentFilters = {
            space: spaceFilter.value,
            category: categoryFilter.value,
            status: statusFilter.value,
            search: searchInput.value
        };
        
        renderTable(filtered);
    }
    
    spaceFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
}

// 获取当前筛选后的项目列表
function getCurrentFilteredItems() {
    let filtered = items;
    
    if (window.currentFilters) {
        if (window.currentFilters.space !== 'all') {
            filtered = filtered.filter(item => item.space === window.currentFilters.space);
        }
        
        if (window.currentFilters.category !== 'all') {
            filtered = filtered.filter(item => item.category === window.currentFilters.category);
        }
        
        if (window.currentFilters.status !== 'all') {
            filtered = filtered.filter(item => item.status === window.currentFilters.status);
        }
        
        if (window.currentFilters.search.trim()) {
            const search = window.currentFilters.search.trim().toLowerCase();
            filtered = filtered.filter(item => 
                item.item.toLowerCase().includes(search) ||
                item.category.toLowerCase().includes(search) ||
                item.brand.toLowerCase().includes(search) ||
                item.note.toLowerCase().includes(search)
            );
        }
    }
    
    return filtered;
}

// 优先级排序
function sortByPriority() {
    const priorityOrder = { '必买': 1, '重要': 2, '按需': 3, '可延后': 4 };
    
    if (sortOrder === 'asc') {
        items.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        sortOrder = 'desc';
    } else {
        items.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        sortOrder = 'asc';
    }
    
    saveData();
    renderTable();
}

// 添加新项目
function addNewItem() {
    const newItem = {
        id: 1, // 临时ID，稍后会重新编号
        space: '全屋',
        category: '家具',
        item: '新项目',
        priority: '按需',
        status: '未开始',
        budget: 0,
        brand: '',
        note: ''
    };
    // 在数组开头插入新项目
    items.unshift(newItem);
    // 重新编号所有项目
    reindexItems();
    updateDashboard();
    updateSpaceSummary();
    updateFilterOptions(); // 更新筛选器
    renderTable();
    
    // 滚动到表格顶部并高亮新行
    setTimeout(() => {
        const firstRow = document.querySelector('tbody tr:first-child');
        if (firstRow) {
            firstRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstRow.style.animation = 'newRowHighlight 1.5s ease';
        }
    }, 100);
}

// 重新编号所有项目
function reindexItems() {
    items.forEach((item, index) => {
        item.id = index + 1;
    });
    saveData();
}

// 删除项目
function deleteItem(id) {
    if (confirm('确定要删除这个项目吗?')) {
        const index = items.findIndex(item => item.id === id);
        if (index >= 0) {
            // 找到要删除的行
            const row = document.querySelector(`tr[data-id="${id}"]`);
            if (row) {
                // 添加淡出动画
                row.style.animation = 'rowFadeOut 0.3s ease';
                setTimeout(() => {
                    items.splice(index, 1);
                    reindexItems(); // 重新编号
                    updateDashboard();
                    updateSpaceSummary();
                    updateFilterOptions(); // 更新筛选器
                    
                    // 重新应用筛选
                    const filtered = getCurrentFilteredItems();
                    renderTable(filtered);
                }, 300);
            } else {
                items.splice(index, 1);
                reindexItems(); // 重新编号
                updateDashboard();
                updateSpaceSummary();
                updateFilterOptions(); // 更新筛选器
                
                // 重新应用筛选
                const filtered = getCurrentFilteredItems();
                renderTable(filtered);
            }
        }
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', checkAuth);

// 标签页切换功能
let currentTab = 'dashboard';
let isAnimating = false;

function switchTab(tabName) {
    if (currentTab === tabName || isAnimating) return;
    
    isAnimating = true;
    
    const oldTab = document.getElementById(`${currentTab}-tab`);
    const newTab = document.getElementById(`${tabName}-tab`);
    const oldBtn = document.querySelector(`.tab-btn[data-tab="${currentTab}"]`);
    const newBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    
    // 确定滑动方向
    const tabs = ['dashboard', 'table'];
    const oldIndex = tabs.indexOf(currentTab);
    const newIndex = tabs.indexOf(tabName);
    const direction = newIndex > oldIndex ? 'left' : 'right';
    
    // 更新按钮状态
    oldBtn.classList.remove('active');
    newBtn.classList.add('active');
    
    // 强制重绘以确保动画流畅
    void oldTab.offsetWidth;
    void newTab.offsetWidth;
    
    // 设置新标签页为绝对定位，准备动画
    newTab.style.display = 'block';
    newTab.style.position = 'absolute';
    newTab.style.width = '100%';
    newTab.style.left = '0';
    newTab.style.top = '0';
    
    // 使用 requestAnimationFrame 确保动画在下一帧开始
    requestAnimationFrame(() => {
        // 移除旧标签页的 active 类
        oldTab.classList.remove('active');
        
        // 添加滑出动画
        oldTab.classList.add(`slide-out-${direction}`);
        
        // 添加滑入动画
        newTab.classList.add('active', `slide-in-${direction === 'left' ? 'right' : 'left'}`);
    });
    
    // 动画结束后清理（300ms）
    setTimeout(() => {
        // 清理旧标签页
        oldTab.style.display = 'none';
        oldTab.classList.remove(`slide-out-${direction}`);
        oldTab.style.position = '';
        oldTab.style.willChange = '';
        
        // 清理新标签页
        newTab.classList.remove(`slide-in-${direction === 'left' ? 'right' : 'left'}`);
        newTab.style.position = 'relative';
        newTab.style.willChange = '';
        
        currentTab = tabName;
        isAnimating = false;
    }, 300);
}
