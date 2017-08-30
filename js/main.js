window.onload = () =>
{
	function parseLen(text)
	{
		return (text < 10) ? '0' + text : text;
	}

	const months =
	[
		'Jan','Feb','Mar','Apr',
		'May','Jun','Jul','Aug',
		'Sep','Oct','Nov','Dec'
	];

	const timeD = document.getElementById('time');
	const dateD = document.getElementById('date');
	setInterval(() =>
	{
		const year = new Date().getFullYear();
		const month = months[new Date().getMonth()];
		const day = new Date().getDate();
		dateD.innerHTML = month + ' ' + day + ' ' + year;

		const hour = parseLen(new Date().getHours());
		const minute = parseLen(new Date().getMinutes());
		const second = parseLen(new Date().getSeconds());
		timeD.innerHTML = hour + ':' + minute + ':' + second;
	},1000);

	function setColor(color)
	{
		[].forEach.call(document.getElementsByClassName('clr-bg'),
			elem => elem.style.backgroundColor = color);
		[].forEach.call(document.getElementsByClassName('clr-fg'),
			elem => elem.style.color = color);
		[].forEach.call(document.getElementsByClassName('prog-bar'),
			elem => elem.setAttribute('stroke',color))
	}

	document.getElementById('change-color').onclick = () =>
	{
		setColor(document.getElementById('color-value').value);
	};

	[].forEach.call(document.getElementsByClassName('color'),
		elem => elem.onclick = () =>
	{
		setColor(elem.textContent);
	});

	[].forEach.call(document.getElementsByClassName('add'),
		e => e.onclick = () =>
	{
		const elem = document.getElementsByClassName('percent')[[].indexOf.call(document.getElementsByClassName('add'),e)];
		elem.value = Math.min(parseInt(elem.value) + 1,360);
	});

	[].forEach.call(document.getElementsByClassName('sub'),
		e => e.onclick = () =>
	{
		const elem = document.getElementsByClassName('percent')[[].indexOf.call(document.getElementsByClassName('sub'),e)];
		elem.value = Math.max(parseInt(elem.value) - 1,0);
	});

	[].forEach.call(document.getElementsByClassName('percent'),
		e => e.onkeydown = evt =>
	{
		if(evt.keyCode === 13)
		{
			const box = document.getElementsByClassName('progress')[[].indexOf.call(document.getElementsByClassName('percent'),e)];
			box.style.width = e.value + '%';
			evt.preventDefault();
		}
	});

	//==================================================================
	
	function revGeoCode(geocoder,lat,lng)
	{
		geocoder.geocode({'location':{'lat':lat,'lng':lng}},
			(results,status) =>
		{
			if(status === 'OK')
			{
				if(results[3])
				{
					document.getElementById('city').textContent = results[3].formatted_address;
				}
			}
		});
	}

	if(navigator.geolocation)
	{
		const geocoder = new google.maps.Geocoder();
		navigator.geolocation.getCurrentPosition(
			ps =>
			{
				revGeoCode(geocoder,ps.coords.latitude,ps.coords.longitude);
			}
		);
	}

	//==================================================================

	[].forEach.call(document.getElementsByClassName('prog-bar'),
		elem =>
	{
		setInterval(() =>
		{
			let disp = document.getElementsByClassName('percent')
			[[].indexOf.call
			(
				document.getElementsByClassName('prog-bar'),
				elem
			)];
			let prog = Math.min(Math.max(isNaN(parseInt(disp.value)) ? 0 : parseInt(disp.value),0),100);
			if(prog <= 33.33)
			{
				const pX = 50 + 45 * prog / 33.33;
				const pY = 5 + 90 * prog / 33.33;
				elem.setAttribute('d','M50 5 L' + pX + ' ' + pY + ' Z');
			}
			else if(prog <= 66.66)
			{
				const pX = 95 - 90 * (prog - 33.33) / 33.33;
				elem.setAttribute('d','M50 5 L95 95 M95 95 L' + pX + ' 95 Z');
			}
			else
			{
				const pX = 5 + 45 * (prog - 66.66) / 33.33;
				const pY = 95 - 90 * (prog - 66.66) / 33.33;
				elem.setAttribute('d','M50 5 L95 95 M95 95 L5 95 M5 95 L'
					+ pX + ' ' + pY + ' Z');
			}
		},1000/100);
	});

	document.getElementById('save').onclick = () =>
	{
		const data =
		{
			'color':document.getElementsByClassName('clr-fg')[0].style.color || '#fff',
			'note1':document.getElementById('note1').childNodes[0].value || '',
			'note2':document.getElementById('note2').childNodes[0].value || '',
			'goal0':
			{
				'name':document.getElementsByClassName('goal')[0].value || '',
				'data':document.getElementsByClassName('percent')[0].value || ''
			},
			'goal1':
			{
				'name':document.getElementsByClassName('goal')[1].value || '',
				'data':document.getElementsByClassName('percent')[1].value || ''
			},
			'goal2':
			{
				'name':document.getElementsByClassName('goal')[2].value || '',
				'data':document.getElementsByClassName('percent')[2].value || ''
			},
			'goal3':
			{
				'name':document.getElementsByClassName('goal')[3].value || '',
				'data':document.getElementsByClassName('percent')[3].value || ''
			},
			'goal4':
			{
				'name':document.getElementsByClassName('goal')[4].value || '',
				'data':document.getElementsByClassName('percent')[4].value || ''
			},
			'goal5':
			{
				'name':document.getElementsByClassName('goal')[5].value || '',
				'data':document.getElementsByClassName('percent')[5].value || ''
			},
			'goal6':
			{
				'name':document.getElementsByClassName('goal')[6].value || '',
				'data':document.getElementsByClassName('percent')[6].value || ''
			},
			'goal7':
			{
				'name':document.getElementsByClassName('goal')[7].value || '',
				'data':document.getElementsByClassName('percent')[7].value || ''
			},
			'goal8':
			{
				'name':document.getElementsByClassName('goal')[8].value || '',
				'data':document.getElementsByClassName('percent')[8].value || ''
			},
			'goal9':
			{
				'name':document.getElementsByClassName('goal')[9].value || '',
				'data':document.getElementsByClassName('percent')[9].value || ''
			}
		};
		const text = JSON.stringify(data);
		const dl = document.createElement('a');
		dl.setAttribute('href','data:text/plain;charset=utf-8,' + 
			encodeURIComponent(text));
		dl.setAttribute('download','abhi.dashB');
		dl.style.display = 'none';
		document.body.appendChild(dl);
		dl.click();
		document.body.removeChild(dl);
		/*
		localStorage.setItem('dashB-color',data.color);
		localStorage.setItem('dashB-note1',data.note1);
		localStorage.setItem('dashB-note2',data.note2);
		localStorage.setItem('dashB-goal0name',data.goal0.name);
		localStorage.setItem('dashB-goal0data',data.goal0.data);
		localStorage.setItem('dashB-goal1name',data.goal1.name);
		localStorage.setItem('dashB-goal1data',data.goal1.data);
		localStorage.setItem('dashB-goal2name',data.goal2.name);
		localStorage.setItem('dashB-goal2data',data.goal2.data);
		localStorage.setItem('dashB-goal3name',data.goal3.name);
		localStorage.setItem('dashB-goal3data',data.goal3.data);
		localStorage.setItem('dashB-goal4name',data.goal4.name);
		localStorage.setItem('dashB-goal4data',data.goal4.data);
		localStorage.setItem('dashB-goal5name',data.goal5.name);
		localStorage.setItem('dashB-goal5data',data.goal5.data);
		localStorage.setItem('dashB-goal6name',data.goal6.name);
		localStorage.setItem('dashB-goal6data',data.goal6.data);
		localStorage.setItem('dashB-goal7name',data.goal7.name);
		localStorage.setItem('dashB-goal7data',data.goal7.data);
		localStorage.setItem('dashB-goal8name',data.goal8.name);
		localStorage.setItem('dashB-goal8data',data.goal8.data);
		localStorage.setItem('dashB-goal9name',data.goal9.name);
		localStorage.setItem('dashB-goal9data',data.goal9.data);
		*/
	};

	document.getElementById('fileid').onchange = () =>
	{
		const fl = document.getElementById('fileid').files[0];
		const reader = new FileReader();
		reader.onload = (e) =>
		{
			const data = JSON.parse(e.target.result);
			setColor(data.color);
			document.getElementById('note1').childNodes[0].value = data.note1;
			document.getElementById('note2').childNodes[0].value = data.note2;
			for(let i=0;i<10;i++)
			{
				document.getElementsByClassName('goal')[i].value = 
					data['goal' + i].name;
				document.getElementsByClassName('percent')[i].value = 
					data['goal' + i].data;
			}
		};
		reader.readAsText(fl);
	};

	document.getElementById('load').onclick = () =>
	{
		document.getElementById('fileid').click();
		/*
		const color = localStorage.getItem('dashB-color');
		const note1 = localStorage.getItem('dashB-note1');
		const note2 = localStorage.getItem('dashB-note2');
		setColor(color);
		document.getElementById('note1').childNodes[0].value = note1;
		document.getElementById('note2').childNodes[0].value = note2;
		for(let i=0;i<10;i++)
		{
			document.getElementsByClassName('goal')[i].value = 
				localStorage.getItem('dashB-goal' + i + 'name');
			document.getElementsByClassName('percent')[i].value = 
				localStorage.getItem('dashB-goal' + i + 'data');
		}
		*/
	};
};
