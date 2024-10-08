    //Change Interface Lang
    var lng_opt = document.getElementById("tn_lng");
    var Dmn_opt = document.getElementById("tn_dmn");

    //Assign properly language and dimension variables
    lng_bar = "";
    lng_meters = "";
    lng_meters_min = "";
    lng_ltr_min = "";
    lng_min = "";
    lng_ltr = "";
    lng_temper = "";

    function changeGuiDim() {
    	if (Dmn_opt.options[Dmn_opt.selectedIndex].value == 1) {
    		if (lng_opt.options[lng_opt.selectedIndex].value == 1) {
    			lng_sec_s = ", sec";
    			lng_bar = ", bar";
    			lng_meters = ", meters";
    			lng_meters_min = ", m/sec";
    			lng_ltr_min = ", l/min";
    			lng_min = ", min";
    			lng_ltr = ", liters";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 2) {
    			lng_sec_s = ", сек";
    			lng_bar = ", бар";
    			lng_meters = ", метры";
    			lng_meters_min = " (м/сек)";
    			lng_ltr_min = " (л/мин)";
    			lng_min = ", мин.";
    			lng_ltr = ", литры";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 3) {
    			lng_sec_s = ", seg";
    			lng_bar = ", bar";
    			lng_meters = ", metros";
    			lng_meters_min = ", m/sec";
    			lng_ltr_min = ", l/min";
    			lng_min = ", min";
    			lng_ltr = ", l";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 4) {
    			lng_sec_s = ", seg";
    			lng_bar = ", bar";
    			lng_meters = ", metros";
    			lng_meters_min = ", m/sec";
    			lng_ltr_min = ", l/min";
    			lng_min = ", min";
    			lng_ltr = ", l";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 5) {
    			lng_sec_s = ", 秒钟";
    			lng_bar = ", bar";
    			lng_meters = ", 米";
    			lng_meters_min = ", 米/秒钟";
    			lng_ltr_min = ", 升/分钟";
    			lng_min = ", 分钟";
    			lng_ltr = ", 升";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 6) {
    			lng_sec_s = ", сек";
    			lng_bar = ", бар";
    			lng_meters = ", метри";
    			lng_meters_min = ", м/сек";
    			lng_ltr_min = ", л/мин";
    			lng_min = ", мин";
    			lng_ltr = ", литри";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 7) {
    			lng_sec_s = ", sec";
    			lng_bar = ", bar";
    			lng_meters = ", metres";
    			lng_meters_min = ", m/sec";
    			lng_ltr_min = ", l/min";
    			lng_min = ", min";
    			lng_ltr = ", litres";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 8) {
    			lng_sec_s = ", 초";
    			lng_bar = ", bar";
    			lng_meters = ", meters";
    			lng_meters_min = ", m/sec";
    			lng_ltr_min = ", l/min";
    			lng_min = ", min";
    			lng_ltr = ", liters";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 9) {
    			lng_sec_s = ", sec";
    			lng_bar = ", bar";
    			lng_meters = ", metri";
    			lng_meters_min = ", m/sec";
    			lng_ltr_min = ", l/min";
    			lng_min = ", min";
    			lng_ltr = ", litri";
    			lng_temper = ", <sup><small>o</small></sup>C";
    		}

    	} else {
    		if (lng_opt.options[lng_opt.selectedIndex].value == 1) {
    			lng_sec_s = ", sec";
    			lng_bar = ", psi";
    			lng_meters = ", ft";
    			lng_meters_min = ", ft/sec";
    			lng_ltr_min = ", ft<sup><small>3</small></sup>/min";
    			lng_min = ", min";
    			lng_ltr = ", ft<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 2) {
    			lng_sec_s = ", сек";
    			lng_bar = ", psi";
    			lng_meters = ", футы";
    			lng_meters_min = " (футов/сек)";
    			lng_ltr_min = " (футов<sup><small>3</small></sup>/мин)";
    			lng_min = ", мин.";
    			lng_ltr = ", футы<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 3) {
    			lng_sec_s = ", seg";
    			lng_bar = ", psi";
    			lng_meters = ", ft";
    			lng_meters_min = ", ft/sec";
    			lng_ltr_min = ", ft<sup><small>3</small></sup>/min";
    			lng_min = ", min";
    			lng_ltr = ", ft<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 4) {
    			lng_sec_s = ", seg";
    			lng_bar = ", psi";
    			lng_meters = ", pés";
    			lng_meters_min = ", p/sec";
    			lng_ltr_min = ", pés<sup><small>3</small></sup>/min";
    			lng_min = ", min";
    			lng_ltr = ", pés<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 5) {
    			lng_sec_s = ", 秒钟";
    			lng_bar = ", psi";
    			lng_meters = ", 英尺";
    			lng_meters_min = ", 英尺/秒钟";
    			lng_ltr_min = ", 英尺<sup><small>3</small></sup>/分钟";
    			lng_min = ", 分钟";
    			lng_ltr = ", 英尺<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 6) {
    			lng_sec_s = ", сек";
    			lng_bar = ", пси";
    			lng_meters = ", фт";
    			lng_meters_min = ", фт/сек";
    			lng_ltr_min = ", фт<sup><small>3</small></sup>/мин";
    			lng_min = ", мин";
    			lng_ltr = ", фт<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 7) {
    			lng_sec_s = ", sec";
    			lng_bar = ", psi";
    			lng_meters = ", ft";
    			lng_meters_min = ", ft/sec";
    			lng_ltr_min = ", ft<sup><small>3</small></sup>/min";
    			lng_min = ", min";
    			lng_ltr = ", ft<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 8) {
    			lng_sec_s = ", 초";
    			lng_bar = ", psi";
    			lng_meters = ", ft";
    			lng_meters_min = ", ft/sec";
    			lng_ltr_min = ", ft<sup><small>3</small></sup>/min";
    			lng_min = ", min";
    			lng_ltr = ", ft<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F";
    		}
    		if (lng_opt.options[lng_opt.selectedIndex].value == 9) {
    			lng_sec_s = ", sec";
    			lng_bar = ", psi";
    			lng_meters = ", ft";
    			lng_meters_min = ", ft/sec";
    			lng_ltr_min = ", ft<sup><small>3</small></sup>/min";
    			lng_min = ", min";
    			lng_ltr = ", ft<sup><small>3</small></sup>";
    			lng_temper = ", <sup><small>o</small></sup>F"
    		}
    	}
    	AssignLng();
    }
    changeGuiDim();
    lng_opt.addEventListener('change', changeGuiDim);
    Dmn_opt.addEventListener('change', changeGuiDim);


    function AssignLng() {
    	lang = {
    		1: {
    			//Eng
				".btn_wmm": "Calculate Magnetic Declination",
				".btn_close_map_picker": "Get Coordinates",
				".btn_get_lat_lon": "Pick from Map",
				".tn_data_format": "Recording Data Format",
				".data_format_gps": "Regular GPS Tracking",
				".data_format_dpv": "Constant Speed DPV",
				".data_format_seacraft": "Constant Speed Seacraft",
				".data_format_ariane": "Constant Speed Ariane",

				".tn_default_ele": "Default Start Elevation" + lng_meters,
			   ".tn_igrf_13": "Use WMM",
			   ".tn_accel_use": "Use Acceleration Sensor Data",
			   ".tn_default_lat": "Default Start Latitude" + ", °",
			   ".tn_default_lon": "Default Start Longitude" + ", °",
			   ".tn_igrf_13_yes": "Yes",
			   ".tn_igrf_13_no": "No",
			   ".tn_accel_use_yes": "Yes",
			   ".tn_accel_use_no": "No",
			   
    			".app_name": "Minotaur",
    			".fullscreen_permission": "Enable Geo Data Access",

    			".tn_rec_freq": "Record Step" + lng_sec_s,
    			".tn_meas_len": "Circle Length" + lng_meters,
    			".tn_const_spd": "Constant Speed Value" + lng_meters_min,
    			".tn_calib_f": "Calibration Factor",
    			//".tn_use_gps" : "Use GPS Data",
    			//".tn_use_spd" : "Use Constant Speed",
    			".btn_add_track": "Add Route",
    			".btn_delete_track": "Delete Route",
    			".btn_save_track": "Save Final Route",
    			//".btn_join_track" : "Join Route To",

    			".td_copyright": "Copyright © 2023 Alexey Vlasov. Licensed under the Apache License 2.0",
    			".btn_save": "Save Current Settings",
    			".btn_restore": "Restore Defaults",
    			".tr_ifc_set": "Interface Style",
    			".tn_color_dark": "Dark Theme",
    			".tn_color_light": "Light Theme",

    			".tn_dmn_mtr": "Meters/Liters/Bar/Celsius",
    			".tn_dmn_imp": "Feet/Cu.Feet/PSI/Fahrenheit",

    			".header0": "Global Settings",
    			".header1": "",
    			".header2": "",
    			".header3": "",
    			".header4": "Route Recorder",
    			".header5": "Route Builder",
    			".header6": "Routes Viewer",
    			".header7": "",
    			".header8": "",

    			".header9": "Learning Tools",

    			".tr_lng": "Language",
    			".tr_dmn": "Unit",
    			".td_warn": "WARNING! THERE IS ALWAYS A RISK OF DECOMPRESSION SICKNESS (DCS) FOR ANY DIVE PROFILE EVEN IF YOU FOLLOW THE DIVE PLAN PRESCRIBED BY DIVE TABLES. NO PROCEDURE OR DIVE TABLE WILL PREVENT THE POSSIBILITY OF DCS OR OXYGEN TOXICITY! An individual’s physiological make up can vary from day to day. You are strongly advised to remain well within the exposure limits provided by the planner to minimize the risk of DCS.",

    			".header10": "Donation Hall of Fame",
    			".tn_donat_header": "",

    			".btn_ios_msg": "How to make a Donation",
    			".btn_ios_tel": "Make Call to Developers",

    			".tn_donat_header_founder": "Founders Donation Section",
    			".tn_donat_header_gold": "Gold Donation Section",
    			".tn_donat_header_silver": "Silver Donation Section",
    			".tn_donat_header_bronze": "Bronze Donation Section",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "S.A.U.L. Recreational Dive Planner"
    		},

    		//Rus
    		2: {
				".btn_wmm": "Вычислить магнитное склонение",
				".btn_close_map_picker": "Получить текущие координаты",
				".btn_get_lat_lon": "Взять значения с карты",
				".tn_data_format": "Формат записи данных",
				".data_format_gps": "Обычный GPS трэк",
				".data_format_dpv": "Скутер постоянная скорость",
				".data_format_seacraft": "Постоянная скорость Seacraft",
				".data_format_ariane": "Постоянная скорость Ariane",

				".tn_default_ele": "Начальная высота над уровнем моря" + lng_meters,

				".tn_igrf_13": "Использовать WMM",
			   ".tn_accel_use": "Использовать данные датчика ускорения",
			   ".tn_default_lat": "Начальная широта по умолчанию" + ", °",
			   ".tn_default_lon": "Начальная долгота по умолчанию" + ", °",
			   ".tn_igrf_13_yes": "Да",
			   ".tn_igrf_13_no": "Нет",
			   ".tn_accel_use_yes": "Да",
			   ".tn_accel_use_no": "Нет",

    			".app_name": "Минотавр",
    			".fullscreen_permission": "Включить доступ к геоданным",

    			".tn_rec_freq": "Шаг записи" + lng_sec_s,
    			".tn_meas_len": "Длина окружности" + lng_meters,
    			".tn_const_spd": "Постоянное значение скорости" + lng_meters_min,
    			".tn_calib_f": "Калибровочный коэффициент",
    			//".tn_use_gps" : "Использовать данные GPS",
    			//".tn_use_spd" : "Использовать постоянную скорость",
    			".btn_add_track": "Добавить трек",
    			".btn_delete_track": "Удалить трек",
    			".btn_save_track": "Сохранить итоговый маршрут",
    			//".btn_join_track" : "Присоединить трек к",

    			".td_copyright": "Все права защищены © 2022 Алексей Власов. Использование в соответствии с Apache 2.0 лицензией",
    			".btn_save": "Сохранить текущие настройки",
    			".btn_restore": "Настройки по умолчанию",
    			".tr_ifc_set": "Стиль интерфейса",
    			".tn_color_dark": " Ночная тема",
    			".tn_color_light": "Дневная тема",

    			".tn_dmn_mtr": "Метры/литры/бары/Цельсий",
    			".tn_dmn_imp": "Футы/куб.футы/PSI/Фаренгейт",

    			".header0": "Глобальные настройки",
    			".header1": "Параметры погружения",
    			".header2": "Предупреждения погружения",
    			".header3": "Смеси погружения",
    			".header4": "Запись маршрутов",
    			".header5": "Конструктор маршрутов",
    			".header6": "Просмотрщик маршрутов",
    			".header7": "Расход газов",
    			".header8": "Стоимость газов",

    			".header9": "Инструменты обучения",

    			".tr_lng": "Язык",
    			".tr_dmn": "Единицы измерения",
    			".td_warn": "ПРЕДУПРЕЖДЕНИЕ! ВНЕ ЗАВИСИМОСТИ ОТ ПРОФИЛЯ ПОГРУЖЕНИЯ И ДАЖЕ В СЛУЧАЕ СОБЛЮДЕНИЯ ПЛАНА ПОГРУЖЕНИЯ, ПРЕДПИСАННОГО ДЕКОМПРЕССИОННЫМИ ТАБЛИЦАМИ, ВСЕГДА СУЩЕСТВУЕТ ОПАСНОСТЬ ВОЗНИКНОВЕНИЯ ДЕКОМПРЕССИОННОЙ БОЛЕЗНИ (ДКБ). НИКАКАЯ ПРОЦЕДУРА ИЛИ ДЕКОМПРЕССИОННАЯ ТАБЛИЦА НЕ СПОСОБНЫ ИСКЛЮЧИТЬ ВОЗМОЖНОСТЬ ВОЗНИКНОВЕНИЯ ДЕКОМПРЕССИОННОЙ БОЛЕЗНИ ИЛИ КИСЛОРОДНОГО ОТРАВЛЕНИЯ! Физиологическое состояние конкретного человека в разные дни может различаться. Настоятельно рекомендуем соблюдать предложенные планером пределы воздействий, причем со значительным запасом, чтобы минимизировать риск возникновения декомпрессионной болезни (ДКБ).",

    			".header10": "Зал славы",
    			".tn_donat_header": "",

    			".btn_ios_msg": "Как сделать пожертвование",
    			".btn_ios_tel": "Сделать звонок разработчикам",

    			".tn_donat_header_founder": "Секция основателей",
    			".tn_donat_header_gold": "Золотая секция",
    			".tn_donat_header_silver": "Серебряная секция",
    			".tn_donat_header_bronze": "Бронзовая секция",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "S.A.U.L. Рекриационный планировщик риска погружений"
    		},

    		
    		3: {
				//Spa
				".btn_wmm": "Calcular Declinación Magnética",
				".btn_close_map_picker": "Obtener Сoordenadas",
				".btn_get_lat_lon": "Elija en el Mapa",
				".tn_data_format": "Formato de Grabación de Datos",
				".data_format_gps": "Seguimiento GPS Normal",
				".data_format_dpv": "Velocidad Constante DPV",
				".data_format_seacraft": "Velocidad Constante Seacraft",
				".data_format_ariane": "Velocidad Constante Ariane",

				".tn_default_ele": "Elevación Inicial Predeterminada" + lng_meters,

				".tn_igrf_13": "Utilizar WMM",
			   ".tn_accel_use": "Utilizar Datos del Sensor de Aceleración",
			   ".tn_default_lat": "Latitud Inicial por Defecto" + ", °",
			   ".tn_default_lon": "Longitud Inicial por Defecto" + ", °",
			   ".tn_igrf_13_yes": "Sí",
			   ".tn_igrf_13_no": "No",
			   ".tn_accel_use_yes": "Sí",
			   ".tn_accel_use_no": "No",

    			".app_name": "Minotauro",
    			".fullscreen_permission": "Acceso a Datos Geográficos",

    			".tn_rec_freq": "Paso Registro" + lng_sec_s,
    			".tn_meas_len": "Longitud Círculo" + lng_meters,
    			".tn_const_spd": "Valor Velocidad Constante" + lng_meters_min,
    			".tn_calib_f": "Factor Calibración",
    			//".tn_use_gps" : "Utilizar Datos GPS",
    			//".tn_use_spd" : "Usar Velocidad Constante",
    			".btn_add_track": "Añadir Ruta",
    			".btn_delete_track": "Borrar Ruta",
    			".btn_save_track": "Guardar Ruta Final",
    			//".btn_join_track" : "Unir Ruta a",

    			".td_copyright": "Copyright © 2023 Alexey Vlasov. Bajo licencia Apache 2.0",
    			".btn_save": "Guardar Configuración Actual",
    			".btn_restore": "Restaurar Valores Predeterminados",
    			".tr_ifc_set": "Estilo Pantalla",
    			".tn_color_dark": "Tema Oscuro",
    			".tn_color_light": "Tema Claro",

    			".tn_dmn_mtr": "Metros/Litros/Bar/Celsius",
    			".tn_dmn_imp": "Pies/Pies Cu./PSI/Fahrenheit",

    			".header0": "Ajustes Generales",
    			".header1": "Ajustes Buceo",
    			".header2": "Alertas",
    			".header3": "Gases",
    			".header4": "Grabador de Rutas",
    			".header5": "Creador de Rutas",
    			".header6": "Visor de Rutas",
    			".header7": "Consumo Gas",
    			".header8": "Precio Gas",

    			".header9": "Herramientas de Aprendizaje",

    			".tr_lng": "Idioma",
    			".tr_dmn": "Unidades de Medida",
    			".td_warn": "¡ATENCIÓN! SIEMPRE HAY UN RIESGO DE ENFERMEDAD DESCOMPRESIVA (ED), PARA CUALQUIER PERFIL DE BUCEO, INCLUSO SI SIGUES EL PLAN INDICADO POR LAS TABLAS DE BUCEO. ¡NINGÚN PROCEDIMIENTO O TABLA DE BUCEO EVITARÁ LA POSIBILIDAD DE ED O DE TOXICIDAD DE OXÍGENO!.  La composición fisiológica de un individuo puede variar de un día a otro. Se recomienda encarecidamente que se mantenga dentro de los límites de exposición proporcionados por el planificador para minimizar el riesgo de ED.",

    			".header10": "Templo de la Fama de la Donación",
    			".tn_donat_header": "",

    			".btn_ios_msg": "Cómo hacer una Donación",
    			".btn_ios_tel": "Hacer una Llamada al Desarrollador",

    			".tn_donat_header_founder": "Sección de Fundadores",
    			".tn_donat_header_gold": "Sección de Oro",
    			".tn_donat_header_silver": "Sección de Plata",
    			".tn_donat_header_bronze": "Sección de Bronce",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "S.A.U.L. Planificador de Buceo Recreativo"
    		},
    		4: {
    			//Prt
				".btn_wmm": "Calcular Declinação Magnética",
				".btn_close_map_picker": "Obter Coordenadas С",
				".btn_get_lat_lon": "Escolher no Mapa",
				".tn_data_format": "Formato dos Dados de Registo",
				".data_format_gps": "Rastreio GPS Regular",
				".data_format_dpv": "Velocidade Constante DPV",
				".data_format_seacraft": "Velocidade Constante Seacraft",
				".data_format_ariane": "Velocidade Constante Ariane",

				".tn_default_ele": "Elevação Inicial Predefinida" + lng_meters,

				".tn_igrf_13": "Utilizar WMM",
				".tn_accel_use": "Utilizar Dados do Sensor de Aceleração",
				".tn_default_lat": "Latitude Inicial Predefinida" + ", °",
				".tn_default_lon": "Longitude Inicial Predefinida" + ", °",
				".tn_igrf_13_yes": "Sim",
				".tn_igrf_13_no": "Não",
				".tn_accel_use_yes": "Sim",
				".tn_accel_use_no": "Não",
 
    			".app_name": "Minotauro",
    			".fullscreen_permission": "Ativar o Acesso a Dados Geográficos",

    			".tn_rec_freq": "Passo de Registo" + lng_sec_s,
    			".tn_meas_len": "Comprimento do Círculo" + lng_meters,
    			".tn_const_spd": "Valor da Velocidade Constante" + lng_meters_min,
    			".tn_calib_f": "Fator de Calibração",
    			//".tn_use_gps" : "Utilizar Dados GPS",
    			//".tn_use_spd" : "Usar Velocidade Constante",
    			".btn_add_track": "Adicionar Rota",
    			".btn_delete_track": "Eliminar Rota",
    			".btn_save_track": "Guardar Rota Final",
    			//".btn_join_track" : "Juntar Rota a",

    			".td_copyright": "Copyright © 2023 Alexey Vlasov. Licenciado por Apache License 2.0",
    			".btn_save": "Guardar Definições Atuais",
    			".btn_restore": "Restaurar Originais",
    			".tr_ifc_set": "Estilo do Interface",
    			".tn_color_dark": "Tema Escuro",
    			".tn_color_light": "Tema Claro",

    			".tn_dmn_mtr": "Metros/Litros/Bar/Celsius",
    			".tn_dmn_imp": "Pés/Pés Cúbicos/PSI/Fahrenheit",

    			".header0": "Definições Globais",
    			".header1": "Definições do Mergulho",
    			".header2": "Alertas",
    			".header3": "Gases",
    			".header4": "Gravador de Rotas",
    			".header5": "Criador de Rotas",
    			".header6": "Visualizador de Rotas",
    			".header7": "Consumo de Gás",
    			".header8": "Preço do Gás",

    			".header9": "Ferramentas de Ensino",

    			".tr_lng": "Língua",
    			".tr_dmn": "Unidades",
    			".td_warn": "ATENÇÃO! EXISTE SEMPRE O RISCO DE DOENÇA DESCOMPRESSIVA (DCS) PARA QUALQUER PERFIL DE MERGULHO, MESMO SE VOCÊ SEGUIR O PLANO DE MERGULHO PRESCRITO NAS TABELAS DE MERGULHO. NENHUM PROCEDIMENTO OU TABELA DE MERGULHO EVITARÃO A POSSIBILIDADE DE DCS OU TOXICIDADE DE OXIGÊNIO! A composição fisiológica de um indivíduo pode variar de um dia para o outro. É altamente recomendável permanecer dentro dos limites de exposição fornecidos pelo planificador para minimizar o risco de DD.",

    			".header10": "Mural de Benfeitores",
    			".tn_donat_header": "",

    			".btn_ios_msg": "Como fazer uma Doação?",
    			".btn_ios_tel": "Contacte com os Criadores",

    			".tn_donat_header_founder": "Fundadores",
    			".tn_donat_header_gold": "Doações Ouro",
    			".tn_donat_header_silver": "Doações Prata",
    			".tn_donat_header_bronze": "Doações Bronze",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",


    			".header11": "S.A.U.L. Planificador de Mergulho Recreativo"
    		},
    		5: {
    			//China
				".btn_wmm": "運算磁偏角",
				".btn_close_map_picker": "取得坐標",
				".btn_get_lat_lon": "從地圖挑選",
				".tn_data_format": "記錄資料格式",
				".data_format_gps": "一般 GPS 路徑",
				".data_format_dpv": "定速 DPV",
				".data_format_seacraft": "定速 Seacraft",
				".data_format_ariane": "定速 Ariane",

				".tn_default_ele": "默认起始海拔" + lng_meters,

				".tn_igrf_13": "使 WMM",
				".tn_accel_use": "使用加速度传感器数据",
				".tn_default_lat": "默认起始纬度" + ", °",
				".tn_default_lon": "默认起始经度" + ", °",
				".tn_igrf_13_yes": "赞同",
				".tn_igrf_13_no": "拒绝",
				".tn_accel_use_yes": "赞同",
				".tn_accel_use_no": "拒绝",
 
    			".app_name": "牛头人",
    			".fullscreen_permission": "启用地理数据访问",

    			".tn_rec_freq": "记录步骤" + lng_sec_s,
    			".tn_meas_len": "圆周长度" + lng_meters,
    			".tn_const_spd": "匀速值" + lng_meters_min,
    			".tn_calib_f": "校准系数",
    			//".tn_use_gps" : "使用 GPS 数据",
    			//".tn_use_spd" : "使用匀速",
    			".btn_add_track": "添加路线",
    			".btn_delete_track": "删除路线",
    			".btn_save_track": "保存最终路线",
    			//".btn_join_track" : "加入路线至",

    			".td_copyright": " 版权所有© 2022 Alexey Vlasov. 根据Apache 2.0许可证授权",
    			".btn_save": "保存当前设定",
    			".btn_restore": "恢复默认设置",
    			".tr_ifc_set": "界面风格",
    			".tn_color_dark": "深色主题",
    			".tn_color_light": "浅色主题",

    			".tn_dmn_mtr": "米/升/Bar",
    			".tn_dmn_imp": "英尺/立方英尺/Bar",

    			".header0": "全局设置",
    			".header1": "潜水设定",
    			".header2": "潜水警报设定",
    			".header3": "潜水气体设定",
    			".header4": "路线记录器",
    			".header5": "路线生成器",
    			".header6": "路线查看器",
    			".header7": "气体消费计算",
    			".header8": "气体价格",

    			".header9": "学习工具",

    			".tr_lng": "语言",
    			".tr_dmn": "单位",
    			".td_warn": "警告！ 任何潜水计划都存在减压病(DCS)的风险，即使你已经遵循了潜水表格中规定的潜水计划。没有一个减压模型或潜水表格可以保证不会发生DCS或氧中毒!一个人的生理状态成每天都在变化。强烈建议您不要超过潜水计划为您提供的暴露极限，以减少DCS的风险。",

    			".header10": "打赏金主爸爸名录",
    			".tn_donat_header": "",

    			".btn_ios_msg": "如何为软件作者打赏",
    			".btn_ios_tel": "致电软件作者 ",

    			".tn_donat_header_founder": "为软件作者打赏",
    			".tn_donat_header_gold": "黄金级土豪爸爸",
    			".tn_donat_header_silver": "白银级土豪爸爸",
    			".tn_donat_header_bronze": "青铜级土豪爸爸",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "S.A.U.L. 休闲潜水计划工具软件"
    		},
    		6: {
    			//Bulgarian
				".btn_wmm": "Изчисляване на магнитно отклонение",
				".btn_close_map_picker": "Получаване на координати",
				".btn_get_lat_lon": "Избор от картата",
				".tn_data_format": "Формат на данните за запис",
				".data_format_gps": "Редовно GPS проследяване",
				".data_format_dpv": "DPV с постоянна скорост",
				".data_format_seacraft": "Seacraft с постоянна скорост",
				".data_format_ariane": "Ariane с постоянна скорост",

				".tn_default_ele": "Начална надморска височина по подразбиране" + lng_meters,

				".tn_igrf_13": "Използване на WMM",
				".tn_accel_use": "Използване на данни от сензора за ускорение",
				".tn_default_lat": "Начална географска ширина" + ", °",
				".tn_default_lon": "Начална дължина" + ", °",
				".tn_igrf_13_yes": "Да",
				".tn_igrf_13_no": "Не",
				".tn_accel_use_yes": "Да",
				".tn_accel_use_no": "Не",
 
    			".app_name": "Минотавър",
    			".fullscreen_permission": "Разрешаване на достъпа до геоданни",

    			".tn_rec_freq": "Стъпка за запис" + lng_sec_s,
    			".tn_meas_len": "Дължина на кръга" + lng_meters,
    			".tn_const_spd": "Стойност на постоянната скорост" + lng_meters_min,
    			".tn_calib_f": "Коефициент на калибриране",
    			//".tn_use_gps" : "Използване на GPS данни",
    			//".tn_use_spd" : "Използване на постоянна скорост",
    			".btn_add_track": "Добавяне на маршрут",
    			".btn_delete_track": "Изтриване на маршрут",
    			".btn_save_track": "Записване на окончателния маршрут",
    			//".btn_join_track" : "Присъединяване към маршрут към",

    			".td_copyright": "Copyright © 2023 Alexey Vlasov. Licensed under the Apache License 2.0",
    			".btn_save": "Запазване на текущите настройки",
    			".btn_restore": "Възстанови фабричните настройки",
    			".tr_ifc_set": "Стил на интерфейса",
    			".tn_color_dark": "Нощна тема",
    			".tn_color_light": "Дневна тема",

    			".tn_dmn_mtr": "Метри/Литри/Бар/Целзий",
    			".tn_dmn_imp": "Фут/куб.Фут/ПСИ/Фаренхайт",

    			".header0": "Общи настройки",
    			".header1": "Настройки на дайва",
    			".header2": "Аларми",
    			".header3": "Дайв газове",
    			".header4": "Записване на маршрута",
    			".header5": "Създаване на маршрути",
    			".header6": "Преглед на маршрути",
    			".header7": "Разход на газа",
    			".header8": "Цена на газа",

    			".header9": "Инструменти за обучение",
    			".tr_lng": "Език",
    			".tr_dmn": "Единица",
    			".td_warn": "ВНИМАНИЕ! ПРИ ВСЕКИ ПРОФИЛ НА ГМУРКАНЕ НЕЗАВИСИМО ДАЛИ Е СЪЗДАДЕН С ПОМОЩТА НА КОМПЮТЪР ИЛИ ТАБЛИЦИ.ВИНАГИ СЪЩЕСТВУВА РИСК ОТ ДЕКОМПРЕСИОННА БОЛЕСТ- ДКБ. НЯМА ПРОЦЕДУРИ ИЛИ ТАБЛИЦИ, КОИТО МОГАТ ДА ВИ ГАРАНТИРАТ, ЧЕ ДКБ ИЛИ КОСЛОРОДНО ОТРАВЯНЕ ЩЕ БЪДАТ ИЗБЕГНАТИ! Физиологията на човека е индивидуална и може да варира дори и в рамките на един ден. Затова горещо ви препоръчваме да спазвате стриктно плана, който сте създали с помощта на планера, дори с добавка на допълнителен консерватизъм с цел, да се минимализира риска от ДКБ и кислородно отравяне! ",

    			".header10": "Зала на славата - дарения",
    			".tn_donat_header": "",
    			".btn_ios_msg": "Как да направя дарение",
    			".btn_ios_tel": "Обадете се на разработчика",
    			".tn_donat_header_founder": "Секция за дарения основатели",
    			".tn_donat_header_gold": "Секция за дарение златна",
    			".tn_donat_header_silver": " Секция за дарение сребърна ",
    			".tn_donat_header_bronze": " Секция за дарение  ",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "S.A.U.L. Recreational Dive Planner"
    		},
    		7: {
				//Fr
				".btn_wmm": "Calculer la déclinaison magnétique",
				".btn_close_map_picker": "Obtenir des coordonnées Сoordinates",
				".btn_get_lat_lon": "Choisir sur la carte",
				".tn_data_format": "Format des données d'enregistremen",
				".data_format_gps": "Suivi GPS régulier",
				".data_format_dpv": "Vitesse constante DPV",
				".data_format_seacraft": "Vitesse constante Seacraft",
				".data_format_ariane": "Vitesse constante Ariane",

				".tn_default_ele": "Altitude de départ par défaut" + lng_meters,

				".tn_igrf_13": "Utiliser l'WMM",
				".tn_accel_use": "Utiliser les données du capteur d'accélération",
				".tn_default_lat": "Latitude de départ par défaut" + ", °",
				".tn_default_lon": "Longitude de départ par défaut" + ", °",
				".tn_igrf_13_yes": "Oui",
				".tn_igrf_13_no": "Non",
				".tn_accel_use_yes": "Oui",
				".tn_accel_use_no": "Non",

    			".app_name": "Minotaure",
    			".fullscreen_permission": "Activer l'accès aux données géographiques",

    			".tn_rec_freq": "Fréquence d'enregistrement" + lng_sec_s,
    			".tn_meas_len": "Longueur du cercle" + lng_meters,
    			".tn_const_spd": "Valeur de la vitesse constante" + lng_meters_min,
    			".tn_calib_f": "Facteur d'étalonnage",
    			//".tn_use_gps" : "Utiliser les données GPS",
    			//".tn_use_spd" : "Utiliser la vitesse constante",
    			".btn_add_track": "Ajouter un itinéraire",
    			".btn_delete_track": "Supprimer un itinéraire",
    			".btn_save_track": "Sauvegarder l'itinéraire final",
    			//".btn_join_track" : "Joindre l'itinéraire à",

    			".td_copyright": "Copyright © 2023 Alexey Vlasov. Sous licence Apache License 2.0",
    			".btn_save": "Enregistrer les données actuelles",
    			".btn_restore": "Restorer les données",
    			".tr_ifc_set": "Style d’interface",
    			".tn_color_dark": "Thème foncé",
    			".tn_color_light": "Thème Clair",

    			".tn_dmn_mtr": "Metres/Litres/Bar/Celsius",
    			".tn_dmn_imp": "Feet/Cu.Feet/PSI/Fahrenheit",

    			".header0": "Réglages généraux",
    			".header1": "Réglages de plongée",
    			".header2": "Alertes de plongée",
    			".header3": "Gaz de plongée",
    			".header4": "Enregistreur d'itinéraire",
    			".header5": "Constructeur d'itinéraires",
    			".header6": "Visualisateur d'itinéraires",
    			".header7": "Consommation de gaz",
    			".header8": "Prix du gaz",

    			".header9": "Outils d’apprentissage",
    			".tr_lng": "Langue",
    			".tr_dmn": "Unité",
    			".td_warn": " ATTENTION! IL Y A TOUJOURS UN RISQUE DE MALADIE DE DÉCOMPRESSION (ADD) POUR TOUT PROFIL DE PLONGÉE MÊME SI VOUS SUIVEZ LE PLAN DE PLONGÉE PRESCRIT PAR LES TABLES DE PLONGÉE. AUCUNE PROCÉDURE OU TABLEAU DE PLONGÉE N'ÉVITERA LA POSSIBILITÉ D'ACCIDENT DE DECOMPRESSION OU DE TOXICITÉ D’OXYGÈNE! La composition physiologique d’un individu peut varier d’un jour à l’autre. Il est fortement conseillé de bien rester dans les limites d'exposition fournies par le planificateur pour minimiser le risque de ADD.",

    			".header10": "Temple de la Donation ",
    			".tn_donat_header": "",
    			".btn_ios_msg": " Comment faire un don ",
    			".btn_ios_tel": " Appelez les développeurs ",
    			".tn_donat_header_founder": " Section des dons des fondateurs ",
    			".tn_donat_header_gold": " Section OR des dons ",
    			".tn_donat_header_silver": " Section Argent des dons",
    			".tn_donat_header_bronze": " Section Bronze des dons",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "S.A.U.L. Planificateur de plongée récréative"
    		},
    		8: {
    			//Korean
				".btn_wmm": "자기 편각 계산하기",
				".btn_close_map_picker": "좌표 가져오기",
				".btn_get_lat_lon": "지도 위에서 선택",
				
				".tn_data_format": "기록 데이터 형식",
				".data_format_gps": "일반 GPS 추적",
				".data_format_dpv": "정속 DPV",
				".data_format_seacraft": "정속 Seacraft",
				".data_format_ariane": "정속 Ariane",
				
				".tn_default_ele": "기본 시작 고도" + lng_meters,

				".tn_igrf_13": "WMM 사용",
				".tn_accel_use": "가속도 센서 데이터 사용",
				".tn_default_lat": "기본 시작 위도" + ", °",
				".tn_default_lon": "기본 시작 경도" + ", °",
				".tn_igrf_13_yes": "예",
				".tn_igrf_13_no": "아니요",
				".tn_accel_use_yes": "예",
				".tn_accel_use_no": "아니요",

    			".app_name": "미노타우로스",
    			".fullscreen_permission": "지리적 데이터 액세스 활성화",

    			".tn_rec_freq": "기록 빈도" + lng_sec_s,
    			".tn_meas_len": "원 길이" + lng_meters,
    			".tn_const_spd": "일정한 속도 값" + lng_meters_min,
    			".tn_calib_f": "보정 계수",
    			//".tn_use_gps" : "GPS 데이터 사용",
    			//".tn_use_spd" : "정속 속도 사용",
    			".btn_add_track": "경로 추가",
    			".btn_delete_track": "경로 삭제",
    			".btn_save_track": "최종 경로 저장",
    			//".btn_join_track" : "경로 연결 대상",

    			".td_copyright": "저작권 © 2023 알렉세이 블라소프. Licensed under the Apache License 2.0",
    			".btn_save": "현재 설정 저장",
    			".btn_restore": "기본값으로 복원",
    			".tr_ifc_set": "인터페이스 스타일",
    			".tn_color_dark": "어두운 테마",
    			".tn_color_light": "밝은 테마",

    			".tn_dmn_mtr": "Meters/Liters/Bar/Celsius",
    			".tn_dmn_imp": "Feet/Cu.Feet/PSI/Fahrenheit",

    			".header0": "전역 설정",
    			".header1": "다이빙 설정",
    			".header2": "다이빙 경고",
    			".header3": "다이빙 기체",
    			".header4": "경로 레코더",
    			".header5": "경로 빌더",
    			".header6": "경로 뷰어",
    			".header7": "가스 소비",
    			".header8": "기체 금액 계산",
    			".header9": "기체 혼합",

    			".tr_lng": "언어",
    			".tr_dmn": "단위",
    			".td_warn": "경고! 다이빙 테이블에 명시된 다이빙 계획을 따르더라도 모든 다이빙 프로필에는 항상 감압병(DCS)의 위험이 있습니다. 어떤 절차나 다이브 테이블도 DCS 또는 산소 독성의 가능성을 방지할 수 없습니다! 개인의 생리적 구성은 매일 다를 수 있습니다. DCS의 위험을 최소화하기 위해 계획자가 제공한 노출 한도 내에서 잘 유지하는 것이 좋습니다..",

    			".header10": "기부 명예의 전당",
    			".tn_donat_header": "",
    			".btn_ios_msg": "기부 방법",
    			".btn_ios_tel": "개발자에게 전화 걸기",
    			".tn_donat_header_founder": "설립자 기부 섹션",
    			".tn_donat_header_gold": "금 기부 섹션",
    			".tn_donat_header_silver": "은 기부 섹션",
    			".tn_donat_header_bronze": "동 기부 섹션",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "S.A.U.L. 레크리에이션 다이빙 플래너"
    		},
    		9: {
				//Italian
				".btn_wmm": "Calcolare la declinazione magnetica",
				".btn_close_map_picker": "Ottieni le coordinate",
				".btn_get_lat_lon": "Selezionare su una mappa",

				".tn_data_format": "Formato dati di registrazione",
				".data_format_gps": "Tracciamento GPS regolare",
				".data_format_dpv": "DPV a velocità costante",
				".data_format_seacraft": "Seacraft a velocità costante",
				".data_format_ariane": "Ariane a velocità costante",
    			
				".tn_default_ele": "Altezza di partenza predefinita" + lng_meters,

				".tn_igrf_13": "Utilizzare WMM",
				".tn_accel_use": "Usa i dati del sensore di accelerazione",
				".tn_default_lat": "Latitudine di partenza predefinita" + ", °",
				".tn_default_lon": "Longitudine di partenza predefinita" + ", °",
				".tn_igrf_13_yes": "Sì",
				".tn_igrf_13_no": "No",
				".tn_accel_use_yes": "Sì",
				".tn_accel_use_no": "No",
 
    			".app_name": "Minotauro",
    			".fullscreen_permission": "Abilitare l'accesso ai dati geografici",

    			".tn_rec_freq": "Frequenza di registrazione" + lng_sec_s,
    			".tn_meas_len": "Lunghezza del cerchio" + lng_meters,
    			".tn_const_spd": "Valore di velocità costante" + lng_meters_min,
    			".tn_calib_f": "Fattore di calibrazione",
    			//".tn_use_gps" : "Utilizzare i dati GPS",
    			//".tn_use_spd" : "Usa velocità costante",
    			".btn_add_track": "Aggiungi percorso",
    			".btn_delete_track": "Cancella percorso",
    			".btn_save_track": "Salva percorso finale",
    			//".btn_join_track" : "Unisci percorso a",

    			".td_copyright": "Copyright © 2023 Alexey Vlasov. Autorizzato secondo la licenza Apache 2.0",
    			".btn_save": "Salva le impostazioni attuali",
    			".btn_restore": "Ripristina alle impostazioni di fabbrica",
    			".tr_ifc_set": "Stile dell’interfaccia",
    			".tn_color_dark": "Tema Scuro",
    			".tn_color_light": "Tema Chiaro",

    			".tn_dmn_mtr": "Metri/Litri/Bar/Celsius",
    			".tn_dmn_imp": "Piedi/Piedi Cubi/PSI/Fahrenheit",

    			".header0": "Impostazioni Generali",
    			".header1": "Impostazioni dell’immersione",
    			".header2": "Allarmi per l’immersione",
    			".header3": "Gas per l’immersione",
    			".header4": "Registratore di percorso",
    			".header5": "Costruttore di percorsi",
    			".header6": "Visualizzatore di percorsi",
    			".header7": "Consumo di Gas",
    			".header8": "Costo dei Gas",

    			".header9": "Strumento di apprendimento",
    			".tr_lng": "Lingua",
    			".tr_dmn": "Unità",
    			".td_warn": "ATTENZIONE! C’È SEMPRE IL RISCHIO DI MALATTIA DA DECOMPRESSIONE (MDD) PER OGNI PROFILO DI IMMERSIONE ANCHE SE SI SEGUE IL PROFILO D’IMMERSIONE PRESCRITTO DALLE TABELLE D’IMMERSIONE. NESSUNA PROCEDURA O TABELLA D’IMMERSIONE POTRÀ PREVENIRE LA POSSIBILITÀ DI UNA MDD O DELLA TOSSICITÀ DA OSSIGENO! La composizione fisiologica di un individuo può variare di giorno in giorno. Si consiglia vivamente di rimanere ben entro i limiti di esposizione forniti dalla pianificazione per ridurre al minimo il rischio di MDD.",

    			".header10": "Albo d’onore dei donatori",
    			".tn_donat_header": "",
    			".btn_ios_msg": " Come fare una donazione ",
    			".btn_ios_tel": "Chiama gli sviluppatori",
    			".tn_donat_header_founder": "Sezione donazione dei fondatori",
    			".tn_donat_header_gold": "Sezione donazione dorata",
    			".tn_donat_header_silver": "Sezione donazione argentata",
    			".tn_donat_header_bronze": "Sezione donazione bronzea",

    			".td_founder_list": "",
    			".td_gold_list": "",
    			".td_silver_list": "",
    			".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev",

    			".header11": "Pianificatore immersioni Ricreative S.A.U.L."
    		}
    	};
    }
    AssignLng();

    function changeLang(force) {
    	var td_lng = lng_opt.options[lng_opt.selectedIndex].value;
    	if (force == "force") {
    		td_lng = 3
    	}
    	for (var i in lang[td_lng]) {
    		document.querySelector(i).innerHTML = lang[td_lng][i];
    	}
    }

    lng_opt.addEventListener('change', changeLang);
    changeLang();


    function plan_lng(val) {
    	if (force_lng == 1) {
    		var td_lng = 1
    	} else {
    		var td_lng = lng_opt.options[lng_opt.selectedIndex].value
    	};
    	//eng
    	if (td_lng == 1) {
			if (val == "ch_WMMWarn") {
    			val = "Warning!<br>The WMM calculation algorithm works correctly until December 2025. After this date, the values may not be accurate.<br>Please update Minotaur in January 2026!<br>"
    		}
			if (val == "ch_SensorError") {
    			val = "Warning!<br>Sensor ERROR or no access to the sensor.<br>Please check sensor access!<br>"
    		}
			if (val == "ch_InternetError") {
    			val = "Warning!<br>Internet not available.<br>Please check your Internet connection!<br>"
    		}
			if (val == "gpx_no_file") {
    			val = "Warning!<br>Please select any GPX file.<br>Thank you!<br>"
    		}
			if (val == "gpx_bad_ext_file") {
    			val = "Error!<br>Incorrect file type.<br>Only GPX file extension alloved!<br>"
    		}
			if (val == "gpx_big_file") {
    			val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb GPX data can be alloved!<br>"
    		}
    		if (val == "gps_lat") {
    			val = "Latitude"
    		}
    		if (val == "gps_lon") {
    			val = "Longitude"
    		}
    		if (val == "gps_ele") {
    			val = "Elevation"
    		}

    		if (val == "ch_UnderDev") {
    			val = "Warning!<br>Please rotate device to Portrait orientation.<br>Thank you!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Liters"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Cubic Feet"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Ltr."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Ft<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "m."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "ft."
    			}
    		}
    	}
    	//rus
    	if (td_lng == 2) {
			if (val == "ch_WMMWarn") {
    			val = "Внимание!<br>Алгоритм расчета WMM корректно работает до декабря 2025 года. После этой даты значения могут быть неточными.<br>Пожалуйста, обновите Минотавр в январе 2026 года!<br>"
    		}			
			if (val == "ch_SensorError") {
    			val = "Внимание!<br>Сенсор сломан либо нет дступа к сенсору.<br>Пожалуйста, проверьте доступ к сенсору!<br>"
    		}
			if (val == "ch_InternetError") {
    			val = "Внимание!<br>Интернет не дступен.<br>Пожалуйста, проверьете соединение с интернетом!<br>"
    		}
			if (val == "gpx_no_file") {
    			val = "Внимание!<br>Выбирите хотя бы один GPX файл.<br>Спасибо!<br>"
    		}
			if (val == "gpx_bad_ext_file") {
    			val = "Ошибка!<br>Не коректный тип файла.<br>Только файлы с расширением GPX могут быть загружены!<br>"
    		}
			if (val == "gpx_big_file") {
    			val = "Ошибка!<br>Превышен размер файла в 30Mб.<br>Допускаются файлы размером не более 30Mб!<br>"
    		}
    		if (val == "gps_lat") {
    			val = "Широта"
    		}
    		if (val == "gps_lon") {
    			val = "Долгота"
    		}
    		if (val == "gps_ele") {
    			val = "Высота"
    		}

    		if (val == "ch_UnderDev") {
    			val = "Внимание!<br>Пожалуйста, поверните устройство в портретную ориентацию.<br>Спасибо!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Литров"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Куб.Футов"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Лит."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Фут<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "м."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "фт."
    			}
    		}
    	}
    	//sp
    	if (td_lng == 3) {
			if (val == "ch_WMMWarn") {
    			val = "¡Atención!<br>El algoritmo de cálculo del MMM funciona correctamente hasta diciembre de 2025. Después de esta fecha, los valores pueden no ser exactos.<br>Por favor, ¡actualice Minotauro en enero de 2026!<br>"
    		}			
			if (val == "ch_SensorError") {
    			val = "¡Atención!<br>ERROR del sensor o no hay acceso al sensor.<br>Compruebe el acceso al sensor.<br>"
    		}
			if (val == "ch_InternetError") {
    			val = "¡Atención!<br>Internet no disponible.<br>Compruebe su conexión a Internet.<br>"
    		}
			if (val == "gpx_no_file") {
    			val = "¡Atención!<br>Por favor, seleccione cualquier archivo GPX.<br>¡Gracias!<br>"
    		}
			if (val == "gpx_bad_ext_file") {
    			val = "¡Error!<br>Tipo de archivo incorrecto.<br>¡Sólo se permite la extensión GPX!<br>"
    		}
			if (val == "gpx_big_file") {
    			val = "¡Error!<br>El tamaño del archivo supera los 30 MB.<br>¡Sólo se admiten archivos GPX de 30 MB!<br>"
    		}
    		if (val == "gps_lat") {
    			val = "Latitud"
    		}
    		if (val == "gps_lon") {
    			val = "LLongitud"
    		}
    		if (val == "gps_ele") {
    			val = "Elevación"
    		}

    		if (val == "ch_UnderDev") {
    			val = "¡Atención!<br>Gira el dispositivo a la orientación vertical.<br>¡Gracias!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Litros"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Pie Cúbico"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Ltr."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Ft<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "m."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "ft."
    			}
    		}
    	}
    	//pt
		if (val == "ch_WMMWarn") {
			val = "Aviso!<br>O algoritmo de cálculo do WMM funciona corretamente até dezembro de 2025. Após esta data, os valores podem não ser exactos.<br>Por favor, actualize o Minotaur em janeiro de 2026!<br>"
		}		
		if (val == "ch_SensorError") {
			val = "Aviso!<br>Sensor ERROR ou sem acesso ao sensor.<br>Verifique o acesso ao sensor!<br>"
		}
		if (val == "ch_InternetError") {
			val = "Aviso!<br>Internet não disponível.<br>Verifique a sua ligação à Internet!<br>"
		}
		if (val == "gpx_no_file") {
			val = "Aviso!<br>Por favor, seleccione qualquer ficheiro GPX.<br>Obrigado!<br>"
		}
		if (val == "gpx_bad_ext_file") {
			val = "Erro!<br>Tipo de ficheiro incorreto.<br>Só é permitida a extensão de ficheiro GPX!<br>"
		}
		if (val == "gpx_big_file") {
			val = "Erro!<br>O tamanho do ficheiro excedeu 30 MB.<br>Só são suportados ficheiros GPX de 30 MB!<br>"
		}
    	if (td_lng == 4) {
    		if (val == "gps_lat") {
    			val = "Latitude"
    		}
    		if (val == "gps_lon") {
    			val = "Longitude"
    		}
    		if (val == "gps_ele") {
    			val = "Elevação"
    		}

    		if (val == "ch_UnderDev") {
    			val = "Atenção!<br>Rode o dispositivo para a orientação vertical.<br>Obrigado!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Litros"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Pés Cubicos"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Ltr."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Pés<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "m."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "pés"
    			}
    		}
    	}
    	//ch
		if (val == "ch_WMMWarn") {
			val = "警告!<br>WMM 計算演算法可正常運作至 2025 年 12 月。<br>請於 2026 年 1 月更新 Minotaur！<br>"
		}		
		if (val == "ch_SensorError") {
			val = "警告!<br>Sensor ERROR（感測器錯誤）或無法存取感測器。<br>請檢查感測器存取權限！<br>"
		}
		if (val == "ch_InternetError") {
			val = "警告!<br>網際網路無法使用。<br>請檢查您的網際網路連線！<br>"
		}
		if (val == "gpx_no_file") {
			val = "警告!<br>请选择任何 GPX 文件。<br>谢谢！<br>"
		}
		if (val == "gpx_bad_ext_file") {
			val = "错误！!<br>文件类型不正确。<br>只允许 GPX 文件扩展名！<br>"
		}
		if (val == "gpx_big_file") {
			val = "错误！!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 GPX 文件！<br>"
		}
    	if (td_lng == 5) {
    		if (val == "gps_lat") {
    			val = "纬度"
    		}
    		if (val == "gps_lon") {
    			val = "经度"
    		}
    		if (val == "gps_ele") {
    			val = "海拔"
    		}

    		if (val == "ch_UnderDev") {
    			val = "警告！<br>请将设备旋转至纵向。<br>谢谢!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "升"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "立方英尺 英尺"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "升"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "英尺<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "米"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "英尺"
    			}
    		}
    	}
    	//br
		if (val == "ch_WMMWarn") {
			val = "Предупреждение!<br>Алгоритъмът за изчисляване на ВММ работи правилно до декември 2025 г. След тази дата стойностите може да не са точни.<br>Моля, актуализирайте Minotaur през януари 2026 г.!<br>"
		}		
		if (val == "ch_SensorError") {
			val = "Предупреждение!<br>Грешка на сензора или липса на достъп до сензора.<br>Моля, проверете правата за достъп до сензора!<br>"
		}
		if (val == "ch_InternetError") {
			val = "Предупреждение!<br>Интернет не е достъпен.<br>Моля, проверете интернет връзката си!<br>"
		}
		if (val == "gpx_no_file") {
			val = "Предупреждение!<br>Изберете произволен GPX файл.<br>Благодаря ви!<br>"
		}
		if (val == "gpx_bad_ext_file") {
			val = "Грешка!<br>Неправилен тип файл.<br>Разрешено е само разширението на файла GPX!<br>"
		}
		if (val == "gpx_big_file") {
			val = "Грешка!<br>Размерът на файла е над 30 MB.<br>Поддържат се само 30 MB GPX файлове!<br>"
		}
    	if (td_lng == 6) {
    		if (val == "gps_lat") {
    			val = "Ширина"
    		}
    		if (val == "gps_lon") {
    			val = "Дължина"
    		}
    		if (val == "gps_ele") {
    			val = "Височина"
    		}

    		if (val == "ch_UnderDev") {
    			val = "Внимание!<br>Моля, завъртете устройството в портретна ориентация.<br>Благодаря Ви!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Литри"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Кубичен фут"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "л."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "фт<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "м."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "фт."
    			}
    		}
    	}
    	//fr
		if (val == "ch_WMMWarn") {
			val = "ATTENTION !<br>L'algorithme de calcul du WMM fonctionne correctement jusqu'en décembre 2025. Après cette date, les valeurs risquent de ne plus être exactes.<br>Veuillez mettre à jour le Minotaure en janvier 2026 !<br>"
		}		
		if (val == "ch_SensorError") {
			val = "ATTENTION !<br>ERREUR capteur ou accès au capteur impossible.<br>Veuillez vérifier les droits d'accès au capteur !<br>"
		}
		if (val == "ch_InternetError") {
			val = "ATTENTION !<br>L'Internet n'est pas disponible.<br>Veuillez vérifier votre connexion Internet !<br>"
		}
		if (val == "gpx_no_file") {
			val = "Attention !<br>Veuillez sélectionner n'importe quel fichier GPX.<br>Merci d'avance !<br>"
		}
		if (val == "gpx_bad_ext_file") {
			val = "Erreur !<br>Type de fichier incorrect.<br>Seule l'extension de fichier GPX est autorisée !<br>"
		}
		if (val == "gpx_big_file") {
			val = "Erreur !<br>La taille du fichier a dépassé 30 Mo.<br>Seuls les fichiers GPX de 30 Mo sont pris en charge !<br>"
		}
    	if (td_lng == 7) {
    		if (val == "gps_lat") {
    			val = "Latitude"
    		}
    		if (val == "gps_lon") {
    			val = "Longitude"
    		}
    		if (val == "gps_ele") {
    			val = "Altitude"
    		}

    		if (val == "ch_UnderDev") {
    			val = "Attention !<br>Tournez l'appareil à la verticale.<br>Merci de votre attention !<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Litres"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Pied3"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Litre."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Pied<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "m."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Pied."
    			}
    		}
    	}
    	//kr
		if (val == "ch_WMMWarn") {
			val = "경고!<br>WMM 계산 알고리즘은 2025년 12월까지 올바르게 작동합니다. 이 날짜 이후에는 값이 정확하지 않을 수 있습니다.<br>2026년 1월에 미노타우로스를 업데이트해 주세요!<br>"
		}		
		if (val == "ch_SensorError") {
			val = "경고!<br>센서 오류 또는 센서 액세스 권한이 없습니다.<br>센서 액세스 권한을 확인하세요!<br>"
		}
		if (val == "ch_InternetError") {
			val = "경고!<br>인터넷을 사용할 수 없습니다.<br>인터넷 연결을 확인하세요!<br>"
		}
		if (val == "gpx_no_file") {
			val = "경고!<br>GPX 파일을 선택하세요.<br>감사합니다!<br>"
		}
		if (val == "gpx_bad_ext_file") {
			val = "오류!<br>파일 형식이 잘못되었습니다.<br>GPX 파일 확장자만 허용됩니다!<br>"
		}
		if (val == "gpx_big_file") {
			val = "오류!<br>파일 크기가 30MB를 초과했습니다.<br>30MB GPX 파일만 지원됩니다!<br>"
		}
    	if (td_lng == 8) {
    		if (val == "gps_lat") {
    			val = "위도"
    		}
    		if (val == "gps_lon") {
    			val = "경도"
    		}
    		if (val == "gps_ele") {
    			val = "고도"
    		}

    		if (val == "ch_UnderDev") {
    			val = "경고!<br>기기를 세로 방향으로 회전하세요.<br>감사합니다!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "리터"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "입방 피트"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Ltr."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Ft<sup><small>3</small></sup>"
    			}
    		}
    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "m."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "ft."
    			}
    		}
    	}
    	//it
		if (val == "ch_WMMWarn") {
			val = "ATTENZIONE!<br>L'algoritmo di calcolo del WMM funziona correttamente fino al dicembre 2025. Dopo questa data, i valori potrebbero non essere accurati.<br>Si prega di aggiornare Minotauro nel gennaio 2026!<br>"
		}		
		if (val == "ch_SensorError") {
			val = "ATTENZIONE!<br>ERRORE sensore o nessun accesso al sensore.<br>Verificare i diritti di accesso al sensore!<br>"
		}
		if (val == "ch_InternetError") {
			val = "ATTENZIONE!<br>Internet non è disponibile.<br>Verificare la connessione a Internet!<br>"
		}
		if (val == "gpx_no_file") {
			val = "Attenzione!<br>Selezionare un file GPX qualsiasi.<br>Grazie!<br>"
		}
		if (val == "gpx_bad_ext_file") {
			val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione GPX!<br>"
		}
		if (val == "gpx_big_file") {
			val = "Errore!<br>La dimensione del file ha superato i 30 MB.<br>Sono supportati solo i file GPX da 30 MB!<br>"
		}
    	if (td_lng == 9) {
    		if (val == "gps_lat") {
    			val = "Latitudine"
    		}
    		if (val == "gps_lon") {
    			val = "Longitudine"
    		}
    		if (val == "gps_ele") {
    			val = "Altitudine"
    		}

    		if (val == "ch_UnderDev") {
    			val = "Attenzione!<br>Ruotare il dispositivo con orientamento verticale.<br>Grazie!<br>"
    		}
    		if (val == "tab_dmn_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Litri"
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Piedi cubici"
    			}
    		}
    		if (val == "ch_gas_ltr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "Lt."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "Ft<sup><small>3</small></sup>"
    			}
    		}

    		if (val == "ch_mtr") {
    			if ($("#tn_dmn").val() == 1) {
    				val = "m."
    			}
    			if ($("#tn_dmn").val() == 2) {
    				val = "ft."
    			}
    		}
    	}
    	return (val.toString());
    }