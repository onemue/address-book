var userData = [];
var temData = {
	'number': 0,
	'portrai': 'src\\portrai\\touxiang.jpg',
	'zhName': '白白',
	'enName': 'baiai'
};
var newData = {
	'number': 0,
	'portrai': 'src\\portrai\\touxiang.jpg',
	'zhName': '白白',
	'enName': 'baiai'
};
var vm = new Vue({
	el: '#app',
	data: {
		userData: userData,
		temData: temData,
		newData: newData,
		newOperation: false
	},
	components: {
		'my-header': {
			template: `<div id="header">
										<slot name="left"></slot>
										<slot name="right"></slot>
									</div>`
		},
		'my-list': {
			template: `<div id="list" transiton="fade">
										<div id='conter' v-if="userData == ''">当前没有任何联系人<br>请点击右上角添加</div>
										<lu class="list_user">
											<il v-for="tiem in userData">
												<div class="user">
																	<div class="portrai">
														<img id="portrai_img" :src="tiem.portrai" alt="">
													</div>
													<div class="user_right">
														<h1 class="zhName" >{{tiem.zhName}}</h1>
														<img class="more" src="src/more.png" alt="" @click="more(userData,tiem.number)">
														<h2 class="enNme" >{{tiem.enName}}</h2>
													</div>
													<div class="listBottom" :id="tiem.number">
														<div id="edit" @click="update(tiem.number)">编辑</div>
														<div id="line"></div>
														<div id="delete" @click="listDelete(tiem.number)">删除</div>
													</div>
													<div class="clearfloat"></div>
												</div>
											</il>
										</lu>
									</div>`,
			props: {
				'user-data': {
					type: Array,
					default: function() {
						return [];
					}
				}
			},
			methods: {

				more: function(userData, number) {
					listBottoms = document.getElementsByClassName("listBottom");
					var test = document.getElementById(number).style.display;
					if (test == 'flex') {
						document.getElementById(number).style.display = 'none';
					} else {
						for (var tiem in userData) {
							document.getElementById(userData[tiem].number).style.display = 'none';
						}
						document.getElementById(number).style.display = 'flex';
					}

				},
				update: function(number) {
					for (var i = 0; i < userData.length; i++) {

						if (userData[i].number == number) {
							var temData = userData[i];
							for (key in userData[i]) {
								if (key != 'number') {
									temData[key] = userData[i][key];
								} else {
								}
							}

							this.$emit("change-tiem-data", temData);
							userData.splice(i, 1);
						}
					}
					listBottoms = document.getElementsByClassName("listBottom");
					for (id in listBottoms) {
						try {
							document.getElementById(id).style.display = 'none';
						} catch (e) {}
					}
					document.getElementById("floar").style.display = 'flex';

				},
				listDelete: function(number) {
					for (var i = 0; i < userData.length; i++) {

						if (userData[i].number == number) {
							userData.splice(i, 1);
						}
					}
					listBottoms = document.getElementsByClassName("listBottom");
					for (id in listBottoms) {
						try {
							document.getElementById(id).style.display = 'none';
						} catch (e) {}
					}
				}
			}
		},
		'my-float': {
			template: `<div class="float">
										<div class="alert">
											<img class="alert_portrai" :src="temdata.portrai" alt="">
											<div class="alert_content">
												
												<slot name="random"></slot>
												<br>
												<input class="alert_input" type="text" id="inpZhName"  placeholder="请输入中文名" v-model:value='temdata.zhName'>
												<input class="alert_input" type="text" id="inpEnName"  placeholder="请输入英文名" v-model:value='temdata.enName'>
												<br>
												<div class="alert_button">
												<slot name="left"></slot>
												<slot name="right"></slot>
												</div>
											</div>
										</div>
									</div>`,
			props: {
				'temdata': {
					type: Object,
					default: function() {
						return {
							'portrai': 'touxiang.jpg',
							'zhName': '亦木',
							'enName': 'Emue'
						}
					}
				}
			},
		}
	},
	methods: {
		greet: function() {
			alert('Hello')
		},
		add: function() {
			num = Math.ceil(Math.random() * 10);
			path = 'src\\portrai\\' + num + '.jpg';
			this.temData['portrai'] = path;
			var name = [{
						'zhName': '阿狸',
						'enName': 'Ahri'
					},
					{
						'zhName': '阿卡丽',
						'enName': 'Akali'
					},
					{
						'zhName': '布里茨',
						'enName': 'Blitzcrank'
					},
					{
						'zhName': '阿利斯塔',
						'enName': 'Akali'
					},
					{
						'zhName': '阿木木',
						'enName': 'Amumu'
					},
					{
						'zhName': '艾尼维亚',
						'enName': 'Anivia'
					},
					{
						'zhName': '安妮',
						'enName': 'Annie'
					},
					{
						'zhName': '艾希',
						'enName': 'Ashe'
					},
					{
						'zhName': '奥瑞利安·索尔',
						'enName': 'Aurelion Sol'
					},
					{
						'zhName': '阿兹尔',
						'enName': 'Azir'
					},
					{
						'zhName': '巴德',
						'enName': 'Bard'
					}
				],
				num = Math.ceil(Math.random() * 10);
			newName = name[num]
			this.temData['zhName'] = newName['zhName'];
			this.temData['enName'] = newName['enName'];
			document.getElementById("floar").style.display = 'flex';
		},
		save: function() {
			var newData = {}
			for (var attr in this.temData) {
				newData[attr] = this.temData[attr];
			}
			userData.push(newData);
			document.getElementById("floar").style.display = 'none';
			this.temData['number'] += 1;
		},
		cancel: function() {
			if (this.newOperation) {
				var newData = {}
				for (var attr in this.newData) {
					newData[attr] = this.newData[attr];
				}
				userData.push(newData);
				document.getElementById("floar").style.display = 'none';
				this.temData['number'] += 1;
				document.getElementById("floar").style.display = 'none';
			} else {
				document.getElementById("floar").style.display = 'none';
			}

		},
		getTiemData: function(data) {
			this.newOperation = true;
			for (key in data) {
				this.newData[key] = data[key]
				if (key != 'number') {
					this.temData[key] = data[key]
				} else {
				}
			}
		},
		random: function() {
			num = Math.ceil(Math.random() * 10);
			path = 'src\\portrai\\' + num + '.jpg';
			this.temData['portrai'] = path;

		}

	},
});
