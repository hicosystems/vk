import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Persik from './panels/Persik';
import Maps from './panels/Maps';
import ymaps from 'ymaps';
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send("VKWebAppGetGeodata", {});
	}

	go = (e) => {this.setState({ activePanel: e.currentTarget.dataset.to })
	if (e.currentTarget.dataset.to=="persik") {
		ymaps.load().then(maps => {
const myMap = new maps.Map('map2', {
        center: [55.751574, 37.573856], // fetchedUser.city
        zoom: 10
  }, {
        searchControlProvider: 'yandex#search'
    });
	
	 
	
	 myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'Событие!',
                contentBody:'<p>тут пропало жЫвотное.</p>' +
                    '<p>Координаты места: '  + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                contentFooter:'<sup>Ну или тут описание животного или под картой</sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
    });

    // Обработка события, возникающего при щелчке
    // правой кнопки мыши в любой точке карты.
    // При возникновении такого события покажем всплывающую подсказку
    // в точке щелчка.
    myMap.events.add('contextmenu', function (e) {
        myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });
    
    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
	
	
})
.catch(error => console.log('Failed to load Yandex Maps', error));
	};
		if (e.currentTarget.dataset.to=="maps") {
		ymaps.load().then(maps => {
const myMap = new maps.Map('map2', {
        center: [55.751574, 37.573856], // fetchedUser.city
        zoom: 10
  }, {
        searchControlProvider: 'yandex#search'
    });
  	
	
})
.catch(error => console.log('Failed to load Yandex Maps', error));
	};
	}
	
	
	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Persik id="persik" go={this.go} />
				<Maps id="maps" go={this.go} />
				
			</View>
		);
	}
}

export default App;
