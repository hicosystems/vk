import React from 'react';
import PropTypes from 'prop-types';
import {Panel, Group, PanelHeader, Div, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import './Persik.css';
import './main.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();
const Persik = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="home">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Пропало ЖыВоТнОе
		</PanelHeader>

			<Group title="Карта">
			<Div>			
			Отметьте точку в которой пропал ваш питомец.
			
	<div id="map2"></div>
			</Div>

		</Group>
	</Panel>
);

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
export default Persik;




