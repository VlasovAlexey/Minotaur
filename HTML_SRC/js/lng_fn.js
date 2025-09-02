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

                lng_meters_gui = " <small> m</small>";
                lng_kph_gui = " <small> kph</small>";
                lng_km_gui = " <small> km</small>";
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

                lng_meters_gui = " <small> м</small>";
                lng_kph_gui = " <small> км/ч</small>";
                lng_km_gui = " <small> км</small>";
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

                lng_meters_gui = " <small> m</small>";
                lng_kph_gui = " <small> kph</small>";
                lng_km_gui = " <small> km</small>";
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

                lng_meters_gui = " <small>  m</small>";
                lng_kph_gui = " <small> kph</small>";
                lng_km_gui = " <small> km</small>";
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

                lng_meters_gui = " <small> 米</small>";
                lng_kph_gui = " <small> 公里/小時</small>";
                lng_km_gui = " <small> 公里</small>";
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

                lng_meters_gui = " <small> м</small>";
                lng_kph_gui = " <small> км/ч</small>";
                lng_km_gui = " <small> км</small>";
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

                lng_meters_gui = " <small> m</small>";
                lng_kph_gui = " <small> kph</small>";
                lng_km_gui = " <small> km</small>";
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

                lng_meters_gui = " <small> m</small>";
                lng_kph_gui = " <small> kph</small>";
                lng_km_gui = " <small> km</small>";

                lng_meters_gui = " <small> m</small>";
                lng_kph_gui = " <small> kph</small>";
                lng_km_gui = " <small> km</small>";
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

                lng_meters_gui = " <small> m</small>";
                lng_kph_gui = " <small> kph</small>";
                lng_km_gui = " <small> km</small>";
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

                lng_meters_gui = " <small> ft</small>";
                lng_kph_gui = " <small> mph</small>";
                lng_km_gui = " <small> mi</small>";
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

                lng_meters_gui = " <small> футов</small>";
                lng_kph_gui = " <small> футов/ч</small>";
                lng_km_gui = " <small> миль</small>";
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

                lng_meters_gui = " <small> ft</small>";
                lng_kph_gui = " <small> mph</small>";
                lng_km_gui = " <small> mi</small>";
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

                lng_meters_gui = " <small> ft</small>";
                lng_kph_gui = " <small> mph</small>";
                lng_km_gui = " <small> mi</small>";
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

                lng_meters_gui = " <small> 英尺</small>";
                lng_kph_gui = " <small> 英里</small>";
                lng_km_gui = " <small> 英里</small>";
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

                lng_meters_gui = " <small> фт</small>";
                lng_kph_gui = " <small> фт/ч</small>";
                lng_km_gui = " <small> миль</small>";
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

                lng_meters_gui = " <small> ft</small>";
                lng_kph_gui = " <small> mph</small>";
                lng_km_gui = " <small> mi</small>";
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

                lng_meters_gui = " <small> ft</small>";
                lng_kph_gui = " <small> mph</small>";
                lng_km_gui = " <small> mi</small>";
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

                lng_meters_gui = " <small> ft</small>";
                lng_kph_gui = " <small> mph</small>";
                lng_km_gui = " <small> mi</small>";
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
                ".opt_trs_ariane": "Welding Threshold" + lng_meters,
                ".location-info": "No Location Data",
                ".location-elev": "Elevation",

                ".opt_line_depth_start": "Start Depth",
                ".opt_line_lat": "Latitude",
                ".opt_line_lon": "Longitude",
                
                ".opt_line_lat_seacraft": "Latitude",
                ".opt_line_lon_seacraft": "Longitude",
                ".opt_button_get_coord_seacraft": "Pick from Map Center",

                ".opt_line_distance": "Distance",
                ".opt_line_azimuth": "Azimuth",
                ".opt_line_depth": "Depth",
                ".opt_button_get_coord": "Pick from Map Center",
                ".opt_button_add_point": "Add Station",
                ".opt_button_finish_line": "Finish Line",

                ".ele_info_text": "ALTITUDE" + lng_meters_gui,
                ".time_info_text": "DURATION",
                ".speed_info_text": "SPEED" + lng_kph_gui,
                ".distance_info_text": "DISTANCE" + lng_km_gui,

                ".tn_track_name": "Explorer Name",
                ".btn_share_track": "Share Your Route",
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
                ".header6": "Sketchbook",
                ".header7": "Map Editor",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

                ".header11": "S.A.U.L. Recreational Dive Planner"
            },

            //Rus
            2: {
                ".opt_trs_ariane": "Порог сварки" + lng_meters,
                ".location-info": "Нет данных",
                ".location-elev": "Высота",

                ".opt_line_depth_start": "Начальная глубина",
                ".opt_line_lat": "Широта",
                ".opt_line_lon": "Долгота",

                ".opt_line_lat_seacraft": "Широта",
                ".opt_line_lon_seacraft": "Долгота",
                ".opt_button_get_coord_seacraft": "Выбрать из центра карты",

                ".opt_line_distance": "Расстояние",
                ".opt_line_azimuth": "Азимут",
                ".opt_line_depth": "Глубина",
                ".opt_button_get_coord": "Выбрать из центра карты",
                ".opt_button_add_point": "Добавить станцию",
                ".opt_button_finish_line": "Завершить",

                ".ele_info_text": "АЛЬТИТУДА" + lng_meters_gui,
                ".time_info_text": "ВРЕМЯ",
                ".speed_info_text": "СКОРОСТЬ" + lng_kph_gui,
                ".distance_info_text": "ДИСТАНЦИЯ" + lng_km_gui,

                ".tn_track_name": "Имя исследователя",
                ".btn_share_track": "Поделиться своим треком",
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
                ".header6": "Блокнот",
                ".header7": "Редактор карт",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

                ".header11": "S.A.U.L. Рекриационный планировщик риска погружений"
            },


            3: {
                //Spa
                ".opt_trs_ariane": "Umbral de soldadura" + lng_meters,
                ".location-info": "Sin datos",
                ".location-elev": "Elevación",

                ".opt_line_depth_start": "Profundidad de inicio",
                ".opt_line_lat": "Latitud",
                ".opt_line_lon": "Longitud",

                ".opt_line_lat_seacraft": "Latitud",
                ".opt_line_lon_seacraft": "Longitud",
                ".opt_button_get_coord_seacraft": "Seleccionar del centro del mapa",

                ".opt_line_distance": "Distancia",
                ".opt_line_azimuth": "Acimut",
                ".opt_line_depth": "Profundidad",
                ".opt_button_get_coord": "Seleccionar del centro del mapa",
                ".opt_button_add_point": "Añadir estación",
                ".opt_button_finish_line": "Finalizar",

                ".ele_info_text": "ALTITUD" + lng_meters_gui,
                ".time_info_text": "DURACIÓN",
                ".speed_info_text": "VELOCIDAD" + lng_kph_gui,
                ".distance_info_text": "DISTANCIA" + lng_km_gui,

                ".tn_track_name": "Nombre del Explorador",
                ".btn_share_track": "Comparte tu Ruta",
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
                ".header6": "Sketchbook",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

                ".header11": "S.A.U.L. Planificador de Buceo Recreativo"
            },
            4: {
                //Prt
                ".opt_trs_ariane": "Limiar de Soldadura" + lng_meters,
                ".location-info": "Sem Dados",
                ".location-elev": "Elevação",

                ".opt_line_depth_start": "Profundidade inicial",
                ".opt_line_lat": "Latitude",
                ".opt_line_lon": "Longitude",

                ".opt_line_lat_seacraft": "Latitude",
                ".opt_line_lon_seacraft": "Longitude",
                ".opt_button_get_coord_seacraft": "Selecionar no Centro do Mapa",

                ".opt_line_distance": "Distância",
                ".opt_line_azimuth": "Azimute",
                ".opt_line_depth": "Profundidade",
                ".opt_button_get_coord": "Selecionar no Centro do Mapa",
                ".opt_button_add_point": "Adicionar estação",
                ".opt_button_finish_line": "Finalizar",

                ".ele_info_text": "ALTITUDE" + lng_meters_gui,
                ".time_info_text": "DURAÇÃO",
                ".speed_info_text": "VELOCIDADE" + lng_kph_gui,
                ".distance_info_text": "DISTÂNCIA" + lng_km_gui,

                ".tn_track_name": "Nome do Explorador",
                ".btn_share_track": "Partilhe a sua Rota",
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
                ".header6": "Caderno de esboços",
                ".header7": "Editor de Mapas",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",


                ".header11": "S.A.U.L. Planificador de Mergulho Recreativo"
            },
            5: {
                //China
                ".opt_trs_ariane": "焊接閾值" + lng_meters,
                ".location-info": "無資料",
                ".location-elev": "海拔",

                ".opt_line_depth_start": "起始深度",
                ".opt_line_lat": "緯度",
                ".opt_line_lon": "經度",

                ".opt_line_lat_seacraft": "緯度",
                ".opt_line_lon_seacraft": "經度",
                ".opt_button_get_coord_seacraft": "從地圖中心選擇",

                ".opt_line_distance": "距離",
                ".opt_line_azimuth": "方位角",
                ".opt_line_depth": "深度",
                ".opt_button_get_coord": "從地圖中心選擇",
                ".opt_button_add_point": "新增網站",
                ".opt_button_finish_line": "完成",

                ".ele_info_text": "緯度" + lng_meters_gui,
                ".time_info_text": "持續時間",
                ".speed_info_text": "速度" + lng_kph_gui,
                ".distance_info_text": "距離" + lng_km_gui,

                ".tn_track_name": "探索者名稱",
                ".btn_share_track": "分享您的路線",
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
                ".header6": "素描本",
                ".header7": "地圖編輯器",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

                ".header11": "S.A.U.L. 休闲潜水计划工具软件"
            },
            6: {
                //Bulgarian
                ".opt_trs_ariane": "Праг на заваряване" + lng_meters,
                ".location-info": "Няма данни",
                ".location-elev": "Кота",

                ".opt_line_depth_start": "Начална дълбочина",
                ".opt_line_lat": "Географска ширина",
                ".opt_line_lon": "Дължина",

                ".opt_line_lat_seacraft": "Географска ширина",
                ".opt_line_lon_seacraft": "Дължина",
                ".opt_button_get_coord_seacraft": "Избор от центъра на картата",

                ".opt_line_distance": "Разстояние",
                ".opt_line_azimuth": "Азимут",
                ".opt_line_depth": "Дълбочина",
                ".opt_button_get_coord": "Избор от центъра на картата",
                ".opt_button_add_point": "Добавяне на станция",
                ".opt_button_finish_line": "Финална линия",

                ".ele_info_text": "АЛТИТУДА" + lng_meters_gui,
                ".time_info_text": "ПРОДЪЛЖИТЕЛНОСТ",
                ".speed_info_text": "СКОРОСТ" + lng_kph_gui,
                ".distance_info_text": "РАЗСТОЯНИЕ" + lng_km_gui,

                ".tn_track_name": "Име на изследователя",
                ".btn_share_track": "Споделете маршрута",
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
                ".header6": "Скицник",
                ".header7": "Редактор на карта",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

                ".header11": "S.A.U.L. Recreational Dive Planner"
            },
            7: {
                //Fr
                ".opt_trs_ariane": "Seuil de soudage" + lng_meters,
                ".location-info": "Aucune donnée",
                ".location-elev": "Altitude",

                ".opt_line_depth_start": "Profondeur de départ",
                ".opt_line_lat": "Latitude",
                ".opt_line_lon": "Longitude",

                ".opt_line_lat_seacraft": "Latitude",
                ".opt_line_lon_seacraft": "Longitude",
                ".opt_button_get_coord_seacraft": "Choisir depuis le centre de la carte",

                ".opt_line_distance": "Distance",
                ".opt_line_azimuth": "Azimut",
                ".opt_line_depth": "Profondeur",
                ".opt_button_get_coord": "Choisir depuis le centre de la carte",
                ".opt_button_add_point": "Ajouter une station",
                ".opt_button_finish_line": "Ligne d'arrivée",

                ".ele_info_text": "ALTITUDE" + lng_meters_gui,
                ".time_info_text": "DURÉE",
                ".speed_info_text": "VITESSE" + lng_kph_gui,
                ".distance_info_text": "DISTANCE" + lng_km_gui,

                ".tn_track_name": "Nom de l'explorateur",
                ".btn_share_track": "Partagez votre itinéraire",
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
                ".header6": "Carnet de croquis",
                ".header7": "Éditeur de cartes",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

                ".header11": "S.A.U.L. Planificateur de plongée récréative"
            },
            8: {
                //Korean
                ".opt_trs_ariane": "용접 임계값" + lng_meters,
                ".location-info": "데이터 없음",
                ".location-elev": "고도",

                ".opt_line_depth_start": "시작 깊이",
                ".opt_line_lat": "위도",
                ".opt_line_lon": "경도",

                ".opt_line_lat_seacraft": "위도",
                ".opt_line_lon_seacraft": "경도",
                ".opt_button_get_coord_seacraft": "지도 센터에서 선택",

                ".opt_line_distance": "거리",
                ".opt_line_azimuth": "방위",
                ".opt_line_depth": "깊이",
                ".opt_button_get_coord": "지도 센터에서 선택",
                ".opt_button_add_point": "스테이션 추가",
                ".opt_button_finish_line": "도착 지점",

                ".ele_info_text": "고도" + lng_meters_gui,
                ".time_info_text": "기간",
                ".speed_info_text": "속도" + lng_kph_gui,
                ".distance_info_text": "거리" + lng_km_gui,

                ".tn_track_name": "탐색기 이름",
                ".btn_share_track": "경로 공유",
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
                ".header6": "스케치북",
                ".header7": "지도 편집기",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

                ".header11": "S.A.U.L. 레크리에이션 다이빙 플래너"
            },
            9: {
                //Italian
                ".opt_trs_ariane": "Soglia di saldatura" + lng_meters,
                ".location-info": "Nessun dato",
                ".location-elev": "Altitudine",

                ".opt_line_depth_start": "Profondità di inizio",
                ".opt_line_lat": "Latitudine",
                ".opt_line_lon": "Longitudine",

                ".opt_line_lat_seacraft": "Latitudine",
                ".opt_line_lon_seacraft": "Longitudine",
                ".opt_button_get_coord_seacraft": "Scegli dal centro della mappa",

                ".opt_line_distance": "Distanza",
                ".opt_line_azimuth": "Azimut",
                ".opt_line_depth": "Profondità",
                ".opt_button_get_coord": "Scegli dal centro della mappa",
                ".opt_button_add_point": "Aggiungi stazione",
                ".opt_button_finish_line": "Traguardo",

                ".ele_info_text": "ALTITUDINE" + lng_meters_gui,
                ".time_info_text": " DURATA",
                ".speed_info_text": "VELOCITÀ" + lng_kph_gui,
                ".distance_info_text": "DISTANZA" + lng_km_gui,

                ".tn_track_name": "Nomi esploratori",
                ".btn_share_track": "Condividi il tuo percorso",
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
                ".header6": "Quaderno di schizzi",
                ".header7": "Editor mappe",
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

                ".td_founder_list": "Lee Nam Gil",
                ".td_gold_list": "Yancarlos Navarro, Yordan Alonso, Jose Perozo, Alfredo Contreras Guitian",
                ".td_silver_list": "",
                ".td_bronze_list": "Evgenij Vlasov, Evgenij Pyanyh, Maxim Parinov, Maxim Belyaev, Elian Lopez Cabrera, Aldo Baron Tadeo, Raidel Montero Jimenez, Pedro Martinez Lopez, Osvaldo Gonzalez Padilla",

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

        //update language for measure tool in map editor
        map_editor.eachLayer(function (layer) {
            //erase only paths and markers layers
            if (layer instanceof L.Path) {
                map_editor.removeLayer(layer);
            } else {
              if (layer instanceof L.Marker) {
                map_editor.removeLayer(layer);
              }
            }
          });
        measure_polyline_add();

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
            if (val == "downl_start") {val = "Download started"}
            if (val == "success") {val = "success"}
            if (val == "error") {val = "error"}
            if (val == "android_interface_err") {val = "Error: Android interface not available"}

            if (val == "import_no_file") {val = "Warning!<br>Please select only allowed file.<br>Thank you!<br>"}
            if (val == "import_bad_ext_file") {val = "Error!<br>Incorrect file type.<br>Only allowed file extension alloved!<br>"}
            if (val == "import_big_file") {val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb file data can be alloved!<br>"}
            if (val == "import_bad_file") {val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"}

            if (val == "gif_no_file") {
                val = "Warning!<br>Please select any GIF file.<br>Thank you!<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "Error!<br>Incorrect file type.<br>Only GIF file extension alloved!<br>"
            }
            if (val == "gif_big_file") {
                val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb GIF data can be alloved!<br>"
            }
            if (val == "gif_bad_file") {
                val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"
            }

            if (val == "jpg_no_file") {
                val = "Warning!<br>Please select any JPG file.<br>Thank you!<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "Error!<br>Incorrect file type.<br>Only JPG file extension alloved!<br>"
            }
            if (val == "jpg_big_file") {
                val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb JPG data can be alloved!<br>"
            }
            if (val == "jpg_bad_file") {
                val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"
            }

            if (val == "ch_big_depth") {val = "The difference in depth value exceeds the distance! It is not possible to build a route with these parameters. Please correct the distance or the depth. The distance value must be greater than the difference between the current depth and the created depth."}

            if (val == "big_file_url") {val = "Too many elements on the map for URI link! Please remove some of the elements to reduce the size of the map. The size of the URI link cannot exceed 8000 characters."}
            if (val == "ch_alert") {val = "Alert"}
            if (val == "ch_info") {val = "Info"}
            if (val == "ch_suc") {val = "Success"}
            if (val == "ch_warn") {val = "Warning"}
            if (val == "ch_cus") {val = "Custom"}

            if (val == "td_in") {val = "In"}
            if (val == "td_out") {val = "Out"}
            if (val == "td_f_line") {val = "Click to <b>finish line</b><br>"}
            if (val == "td_delete_pnt") {val = "Press SHIFT-key and click to <b>delete point</b>"}
            if (val == "td_move_pnt") {val = "Click and drag to <b>move point</b><br>"}
            if (val == "td_res_line") {val = "<br>Press CTRL-key and click to <b>resume line</b>"}
            if (val == "td_add_pnt") {val = "Press CTRL-key and click to <b>add point</b>"}
            if (val == "td_mtr") {val = "m"}
            if (val == "td_km") {val = "km"}
            if (val == "td_ft") {val = "ft"}
            if (val == "td_mi") {val = "mi"}
            if (val == "td_nm") {val = "nm"}

            if(val  == "ch_lnkClipboard_URL"){val = "Congratulations!<br>Map is successful loaded and ready to view.<br>Please tap to view map!"}
            if(val  == "ch_lnkClipboard"){val = "The share link is in your clipboard!"}
            if (val == "td_depth") {
                val = "depth"
            }
            if (val == "td_distance") {
                val = "distance"
            }
            if (val == "bad_file_format") {
                val = "Error!<br>Bad file format or corrupted data or incompatible data.<br>Please double check save or export settings or file data consistency!<br>"
            }
            if (val == "csv_no_file") {
                val = "Warning!<br>Please select any CSV file.<br>Thank you!<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "Error!<br>Incorrect file type.<br>Only CSV file extension alloved!<br>"
            }
            if (val == "csv_big_file") {
                val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb CSV data can be alloved!<br>"
            }
            if (val == "csv_bad_file") {
                val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"
            }

            if (val == "geojson_no_file") {
                val = "Warning!<br>Please select any GeoJSON file.<br>Thank you!<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "Error!<br>Incorrect file type.<br>Only GeoJSON file extension alloved!<br>"
            }
            if (val == "geojson_big_file") {
                val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb GeoJSON data can be alloved!<br>"
            }
            if (val == "geojson_bad_file") {
                val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"
            }

            if (val == "kml_no_file") {
                val = "Warning!<br>Please select any KML file.<br>Thank you!<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "Error!<br>Incorrect file type.<br>Only KML file extension alloved!<br>"
            }
            if (val == "kml_big_file") {
                val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb KML data can be alloved!<br>"
            }
            if (val == "kml_bad_file") {
                val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"
            }

            if (val == "tml_no_file") {
                val = "Warning!<br>Please select any TML file.<br>Thank you!<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "Error!<br>Incorrect file type.<br>Only TML file extension alloved!<br>"
            }
            if (val == "tml_big_file") {
                val = "Error!<br>Exceeded size 30MB.<br>Only 30Mb TML data can be alloved!<br>"
            }
            if (val == "tml_bad_file") {
                val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "Error!<br>An unexpected error occurred while reading the file.<br>Check the connection and the correctness of the media!<br>"
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
            if (val == "downl_start") {val = "Загрузка началась"}
            if (val == "success") {val = "success"}
            if (val == "error") {val = "error"}
            if (val == "android_interface_err") {val = "Ошибка: интерфейс Android недоступен"}

            if (val == "import_no_file") {
                val = "Внимание!<br>Пожалуйста, выберите только разрешенные файлы.<br>Спасибо!<br>"
            }
            if (val == "import_bad_ext_file") {
                val = "Ошибка!<br>Неверный тип файла.<br>Разрешены только разрешенные расширения файлов!<br>"
            }
            if (val == "import_big_file") {
                val = "Ошибка!<br>Превышен размер 30 МБ.<br>Разрешено хранить только 30 МБ файлов данных!<br>"
            }
            if (val == "import_bad_file") {
                val = val = "Ошибка!<br>Произошла непредвиденная ошибка при чтении файла.<br>Проверьте подключение и правильность носителя!<br>"
            }

            if (val == "gif_no_file") {
                val = "Внимание!<br>Выбирите хотя бы один GIF файл.<br>Спасибо!<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "Ошибка!<br>Не коректный тип файла.<br>Только файлы с расширением GIF могут быть загружены!<br>"
            }
            if (val == "gif_big_file") {
                val = "Ошибка!<br>Превышен размер файла в 30Mб.<br>Допускаются GIF файлы размером не более 30Mб!<br>"
            }
            if (val == "gif_bad_file") {
                val = "Ошибка!<br>Во время чтения файла произошла непредвиденная ошибка.<br>Проверьте подключение и исправность носителя!<br>"
            }

            if (val == "jpg_no_file") {
                val = "Внимание!<br>Выбирите хотя бы один JPG файл.<br>Спасибо!<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "Ошибка!<br>Не коректный тип файла.<br>Только файлы с расширением JPG могут быть загружены!<br>"
            }
            if (val == "jpg_big_file") {
                val = "Ошибка!<br>Превышен размер файла в 30Mб.<br>Допускаются JPG файлы размером не более 30Mб!<br>"
            }
            if (val == "jpg_bad_file") {
                val = "Ошибка!<br>Во время чтения файла произошла непредвиденная ошибка.<br>Проверьте подключение и исправность носителя!<br>"
            }

            if (val == "ch_big_depth") {val = "Разница в значении глубины превышает дистанцию! Невозможно построить маршрут с такими параметрами. Пожалуйста, исправьте дистанцию или глубину. Значение дистанции быть больше, чем разница между текущей и создаваемой глубиной."}
            if (val == "big_file_url") {val = "Слишком много элементов на карте для URI ссылки! Пожалуйста удалите часть элементов для уменьшения размера карты. Размер URI ссылки не может превышать 8000 символов."}
            if (val == "ch_alert") {val = "Оповещение"}
            if (val == "ch_info") {val = "Информация"}
            if (val == "ch_suc") {val = "Успех"}
            if (val == "ch_warn") {val = "Предупреждение"}
            if (val == "ch_cus") {val = "Пользовательский"}

            if (val == "td_in") {val = "От"}
            if (val == "td_out") {val = "До"}
            if (val == "td_f_line") {val = "Нажмите для <b>завершения линии</b><br>"}
            if (val == "td_delete_pnt") {val = "Нажмите SHIFT-key и щелкните для <b>удаления точки</b>"}
            if (val == "td_move_pnt") {val = "Щелкните и перетащите для <b>перемещения точки</b><br>"}
            if (val == "td_res_line") {val = "<br>Нажмите CTRL-key и щелкните для <b>продолжения линии</b>"}
            if (val == "td_add_pnt") {val = "Зажмите CTRL-key и щелкните для <b>добавления точки</b>"}
            if (val == "td_mtr") {val = "м"}
            if (val == "td_km") {val = "км"}
            if (val == "td_ft") {val = "фт"}
            if (val == "td_mi") {val = "ми"}
            if (val == "td_nm") {val = "нм"}

            if(val  == "ch_lnkClipboard_URL"){val = "Поздравляем!<br>Карта успешно загружена и готова к просмотру.<br>Пожалуйста, нажмите для просмотра карты!"}
            if(val  == "ch_lnkClipboard"){val = "Ссылка на ваш план скопирована в буфер обмена!"}
            if (val == "td_depth") {
                val = "глубина"
            }
            if (val == "td_distance") {
                val = "дистанция"
            }
            if (val == "bad_file_format") {
                val = "Ошибка!<br>Плохой формат файла, поврежденные данные или несовместимые данные.<br>Пожалуйста, проверьте настройки сохранения или экспорта, или согласованность данных файла!<br>"
            }
            if (val == "csv_no_file") {
                val = "Внимание!<br>Выбирите хотя бы один CSV файл.<br>Спасибо!<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "Ошибка!<br>Не коректный тип файла.<br>Только файлы с расширением CSV могут быть загружены!<br>"
            }
            if (val == "csv_big_file") {
                val = "Ошибка!<br>Превышен размер файла в 30Mб.<br>Допускаются файлы размером не более 30Mб!<br>"
            }
            if (val == "csv_bad_file") {
                val = "Ошибка!<br>Во время чтения файла произошла непредвиденная ошибка.<br>Проверьте подключение и исправность носителя!<br>"
            }

            if (val == "geojson_no_file") {
                val = "Внимание!<br>Выбирите хотя бы один GeoJSON файл.<br>Спасибо!<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "Ошибка!<br>Не коректный тип файла.<br>Только файлы с расширением GeoJSON могут быть загружены!<br>"
            }
            if (val == "geojson_big_file") {
                val = "Ошибка!<br>Превышен размер файла в 30Mб.<br>Допускаются GeoJSON файлы размером не более 30Mб!<br>"
            }
            if (val == "geojson_bad_file") {
                val = "Ошибка!<br>Во время чтения файла произошла непредвиденная ошибка.<br>Проверьте подключение и исправность носителя!<br>"
            }

            if (val == "kml_no_file") {
                val = "Внимание!<br>Выбирите хотя бы один KML файл.<br>Спасибо!<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "Ошибка!<br>Не коректный тип файла.<br>Только файлы с расширением KML могут быть загружены!<br>"
            }
            if (val == "kml_big_file") {
                val = "Ошибка!<br>Превышен размер файла в 30Mб.<br>Допускаются файлы размером не более 30Mб!<br>"
            }
            if (val == "kml_bad_file") {
                val = "Ошибка!<br>Во время чтения файла произошла непредвиденная ошибка.<br>Проверьте подключение и исправность носителя!<br>"
            }

            if (val == "tml_no_file") {
                val = "Внимание!<br>Выбирите хотя бы один TML файл.<br>Спасибо!<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "Ошибка!<br>Не коректный тип файла.<br>Только файлы с расширением TML могут быть загружены!<br>"
            }
            if (val == "tml_big_file") {
                val = "Ошибка!<br>Превышен размер файла в 30Mб.<br>Допускаются файлы размером не более 30Mб!<br>"
            }
            if (val == "tml_bad_file") {
                val = "Ошибка!<br>Во время чтения файла произошла непредвиденная ошибка.<br>Проверьте подключение и исправность носителя!<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "Ошибка!<br>Во время чтения файла произошла непредвиденная ошибка.<br>Проверьте подключение и исправность носителя!<br>"
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
            if (val == "downl_start") {val = "Descarga iniciada"}
            if (val == "success") {val = "éxito"}
            if (val == "error") {val = "error"}
            if (val == "android_interface_err") {val = "Error: Interfaz de Android no disponible"}

            if (val == "import_no_file") {val = "Advertencia!<br>Seleccione solo los archivos permitidos.<br>¡Gracias!<br>"}
            if (val == "import_bad_ext_file") {val = "Error!<br>Tipo de archivo incorrecto.<br>¡Solo se permite la extensión de archivo permitida!<br>"}
            if (val == "import_big_file") {val = "Error!<br>Tamaño excedido 30 MB.<br>¡Solo se pueden permitir datos de archivo de 30 MB!<br>"}
            if (val == "import_bad_file") {val = "Error!<br>Ocurrió un error inesperado al leer el archivo.<br>¡Verifique la conexión y la corrección del medio!<br>"}

            if (val == "gif_no_file") {
                val = "¡Atención!<br>Por favor, seleccione cualquier archivo GIF.<br>¡Gracias!<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "¡Error!<br>Tipo de archivo incorrecto.<br>¡Sólo se permite la extensión GIF!<br>"
            }
            if (val == "gif_big_file") {
                val = "¡Error!<br>El tamaño del archivo supera los 30 MB.<br>¡Sólo se admiten archivos GIF de 30 MB!<br>"
            }
            if (val == "gif_bad_file") {
                val = "¡Error!<br>Se ha producido un error inesperado al leer el archivo.<br>Compruebe la conexión y la corrección del soporte!<br>"
            }

            if (val == "jpg_no_file") {
                val = "¡Atención!<br>Por favor, seleccione cualquier archivo JPG.<br>¡Gracias!<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "¡Error!<br>Tipo de archivo incorrecto.<br>¡Sólo se permite la extensión JPG!<br>"
            }
            if (val == "jpg_big_file") {
                val = "¡Error!<br>El tamaño del archivo supera los 30 MB.<br>¡Sólo se admiten archivos JPG de 30 MB!<br>"
            }
            if (val == "jpg_bad_file") {
                val = "¡Error!<br>Se ha producido un error inesperado al leer el archivo.<br>Compruebe la conexión y la corrección del soporte!<br>"
            }

            if (val == "ch_big_depth") {val = "¡La diferencia en el valor de profundidad excede la distancia! No es posible construir una ruta con estos parámetros. Corrija la distancia o la profundidad. El valor de la distancia debe ser mayor que la diferencia entre la profundidad actual y la profundidad creada."}

            if (val == "big_file_url") {val = "¡Demasiados elementos en el mapa para el enlace URI! Por favor, elimine algunos elementos para reducir el tamaño del mapa. El tamaño del enlace URI no puede superar los 8000 caracteres."}
            if (val == "ch_alert") {val = "Alerta"}
            if (val == "ch_info") {val = "Información"}
            if (val == "ch_suc") {val = "Éxito"}
            if (val == "ch_warn") {val = "Advertencia"}
            if (val == "ch_cus") {val = "Personalizado"}

            if (val == "td_in") {val = "Entrada"}
            if (val == "td_out") {val = "Salida"}
            if (val == "td_f_line") {val = "Haz clic para <b>terminar línea</b><br>"}
            if (val == "td_delete_pnt") {val = "Presiona la tecla MAYÚS y haz clic para <b>eliminar punto</b>"}
            if (val == "td_move_pnt") {val = "Haz clic y arrastra para <b>mover punto</b><br>"}
            if (val == "td_res_line") {val = "<br>Presiona la tecla CTRL y haz clic para <b>reanudar línea</b>"}
            if (val == "td_add_pnt") {val = "Presiona la tecla CTRL y haz clic para <b>añadir punto</b>"}
            if (val == "td_mtr") {val = "m"}
            if (val == "td_km") {val = "km"}
            if (val == "td_ft") {val = "ft"}
            if (val == "td_mi") {val = "mi"}
            if (val == "td_nm") {val = "nm"}

            if(val  == "ch_lnkClipboard_URL"){val = "¡Enhorabuena!<br>El mapa se ha cargado correctamente y está listo para verse.<br>Por favor, pulse para ver el mapa!"}
            if(val  == "ch_lnkClipboard"){val = "El enlace de su plan se ha copiado en el portapapeles!"}
            if (val == "td_depth") {
                val = "profundidad"
            }
            if (val == "td_distance") {
                val = "distancia"
            }
            if (val == "bad_file_format") {
                val = "¡Error!<br>Formato de archivo incorrecto o datos dañados o incompatibles.<br>Compruebe la configuración de guardado o exportación o la coherencia de los datos del archivo!<br>"
            }
            if (val == "csv_no_file") {
                val = "¡Atención!<br>Por favor, seleccione cualquier archivo CSV.<br>¡Gracias!<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "¡Error!<br>Tipo de archivo incorrecto.<br>¡Sólo se permite la extensión CSV!<br>"
            }
            if (val == "csv_big_file") {
                val = "¡Error!<br>El tamaño del archivo supera los 30 MB.<br>¡Sólo se admiten archivos CSV de 30 MB!<br>"
            }
            if (val == "csv_bad_file") {
                val = "¡Error!<br>Se ha producido un error inesperado al leer el archivo.<br>Compruebe la conexión y la corrección del soporte!<br>"
            }

            if (val == "geojson_no_file") {
                val = "¡Atención!<br>Por favor, seleccione cualquier archivo GeoJSON.<br>¡Gracias!<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "¡Error!<br>Tipo de archivo incorrecto.<br>¡Sólo se permite la extensión GeoJSON!<br>"
            }
            if (val == "geojson_big_file") {
                val = "¡Error!<br>El tamaño del archivo supera los 30 MB.<br>¡Sólo se admiten archivos GeoJSON de 30 MB!<br>"
            }
            if (val == "geojson_bad_file") {
                val = "¡Error!<br>Se ha producido un error inesperado al leer el archivo.<br>Compruebe la conexión y la corrección del soporte!<br>"
            }

            if (val == "kml_no_file") {
                val = "¡Atención!<br>Por favor, seleccione cualquier archivo KML.<br>¡Gracias!<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "¡Error!<br>Tipo de archivo incorrecto.<br>¡Sólo se permite la extensión KML!<br>"
            }
            if (val == "kml_big_file") {
                val = "¡Error!<br>El tamaño del archivo supera los 30 MB.<br>¡Sólo se admiten archivos KML de 30 MB!<br>"
            }
            if (val == "kml_bad_file") {
                val = "¡Error!<br>Se ha producido un error inesperado al leer el archivo.<br>Compruebe la conexión y la corrección del soporte!<br>"
            }

            if (val == "tml_no_file") {
                val = "¡Atención!<br>Por favor, seleccione cualquier archivo TML.<br>¡Gracias!<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "¡Error!<br>Tipo de archivo incorrecto.<br>¡Sólo se permite la extensión TML!<br>"
            }
            if (val == "tml_big_file") {
                val = "¡Error!<br>El tamaño del archivo supera los 30 MB.<br>¡Sólo se admiten archivos TML de 30 MB!<br>"
            }
            if (val == "tml_bad_file") {
                val = "¡Error!<br>Se ha producido un error inesperado al leer el archivo.<br>Compruebe la conexión y la corrección del soporte!<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "¡Error!<br>Se ha producido un error inesperado al leer el archivo.<br>Compruebe la conexión y la corrección del soporte!<br>"
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
        if (td_lng == 4) {
            if (val == "downl_start") {val = "Download iniciado"}
            if (val == "success") {val = "sucesso"}
            if (val == "error") {val = "erro"}
            if (val == "android_interface_err") {val = "Erro: Interface Android indisponível"}

            if (val == "import_no_file") {val = "Aviso!<br>Selecione apenas os ficheiros permitidos.<br>Obrigado!<br>"}
            if (val == "import_bad_ext_file") {val = "Erro!<br>Tipo de ficheiro incorreto.<br>Apenas extensão de ficheiro permitida!<br>"}
            if (val == "import_big_file") {val = "Erro!<br>Tamanho excedido 30 MB.<br>Só podem ser permitidos dados de ficheiros de 30 MB!<br>"}
            if (val == "import_bad_file") {val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a exatidão do suporte!<br>"}

            if (val == "gif_no_file") {
                val = "Aviso!<br>Por favor, seleccione qualquer ficheiro GIF.<br>Obrigado!<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "Erro!<br>Tipo de ficheiro incorreto.<br>Só é permitida a extensão de ficheiro GIF!<br>"
            }
            if (val == "gif_big_file") {
                val = "Erro!<br>O tamanho do ficheiro excedeu 30 MB.<br>Só são suportados ficheiros GIF de 30 MB!<br>"
            }
            if (val == "gif_bad_file") {
                val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a correção do suporte!<br>"
            }

            if (val == "jpg_no_file") {
                val = "Aviso!<br>Por favor, seleccione qualquer ficheiro JPG.<br>Obrigado!<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "Erro!<br>Tipo de ficheiro incorreto.<br>Só é permitida a extensão de ficheiro JPG!<br>"
            }
            if (val == "jpg_big_file") {
                val = "Erro!<br>O tamanho do ficheiro excedeu 30 MB.<br>Só são suportados ficheiros JPG de 30 MB!<br>"
            }
            if (val == "jpg_bad_file") {
                val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a correção do suporte!<br>"
            }
            
            if (val == "ch_big_depth") {val = "A diferença no valor de profundidade excede a distância! Não é possível construir um percurso com estes parâmetros. Corrija a distância ou a profundidade. O valor da distância deve ser superior à diferença entre a profundidade actual e a profundidade criada."}

            if (val == "big_file_url") {val = "Demasiados elementos no mapa para a ligação URI! Remova alguns dos elementos para reduzir o tamanho do mapa. O tamanho da ligação URI não pode exceder 8000 caracteres."}
            if (val == "ch_alert") {val = "Alerta"}
            if (val == "ch_info") {val = "Info"}
            if (val == "ch_suc") {val = "Sucesso"}
            if (val == "ch_warn") {val = "Aviso"}
            if (val == "ch_cus") {val = "Personalizado"}

            if (val == "td_in") {val = "Em"}
            if (val == "td_out") {val = "Fora"}
            if (val == "td_f_line") {val = "Clique para <b>chegar à meta</b><br>"}
            if (val == "td_delete_pnt") {val = "Pressione a tecla SHIFT e clique para <b>apagar ponto</b>"}
            if (val == "td_move_pnt") {val = "Clique e arraste para <b>mover o ponto</b><br>"}
            if (val == "td_res_line") {val = "<br>Pressione a tecla CTRL e clique para <b>retomar a linha</b>"}
            if (val == "td_add_pnt") {val = "Pressione a tecla CTRL e clique para <b>adicionar ponto</b>"}
            if (val == "td_mtr") {val = "m"}
            if (val == "td_km") {val = "km"}
            if (val == "td_ft") {val = "pés"}
            if (val == "td_mi") {val = "mi"}
            if (val == "td_nm") {val = "nm"}

            if(val  == "ch_lnkClipboard_URL"){val = "Parabéns!<br>O mapa foi carregado com êxito e está pronto a ser visualizado.<br>Por favor, toque para ver o mapa!"}
            if(val  == "ch_lnkClipboard"){val = "A ligação do seu plano é copiada para a área de transferência!"}
            if (val == "td_depth") {
                val = "profundidade"
            }
            if (val == "td_distance") {
                val = "distância"
            }
            if (val == "bad_file_format") {
                val = "Erro!<br>Formato de ficheiro incorreto ou dados danificados ou incompatíveis.<br>Verifique as definições de gravação ou exportação ou a consistência dos dados do ficheiro!<br>"
            }
            if (val == "csv_no_file") {
                val = "Aviso!<br>Por favor, seleccione qualquer ficheiro CSV.<br>Obrigado!<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "Erro!<br>Tipo de ficheiro incorreto.<br>Só é permitida a extensão de ficheiro CSV!<br>"
            }
            if (val == "csv_big_file") {
                val = "Erro!<br>O tamanho do ficheiro excedeu 30 MB.<br>Só são suportados ficheiros CSV de 30 MB!<br>"
            }
            if (val == "csv_bad_file") {
                val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a correção do suporte!<br>"
            }

            if (val == "geojson_no_file") {
                val = "Aviso!<br>Por favor, seleccione qualquer ficheiro GeoJSON.<br>Obrigado!<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "Erro!<br>Tipo de ficheiro incorreto.<br>Só é permitida a extensão de ficheiro GeoJSON!<br>"
            }
            if (val == "geojson_big_file") {
                val = "Erro!<br>O tamanho do ficheiro excedeu 30 MB.<br>Só são suportados ficheiros GeoJSON de 30 MB!<br>"
            }
            if (val == "geojson_bad_file") {
                val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a correção do suporte!<br>"
            }

            if (val == "kml_no_file") {
                val = "Aviso!<br>Por favor, seleccione qualquer ficheiro KML.<br>Obrigado!<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "Erro!<br>Tipo de ficheiro incorreto.<br>Só é permitida a extensão de ficheiro KML!<br>"
            }
            if (val == "kml_big_file") {
                val = "Erro!<br>O tamanho do ficheiro excedeu 30 MB.<br>Só são suportados ficheiros KML de 30 MB!<br>"
            }
            if (val == "kml_bad_file") {
                val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a correção do suporte!<br>"
            }

            if (val == "tml_no_file") {
                val = "Aviso!<br>Por favor, seleccione qualquer ficheiro TML.<br>Obrigado!<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "Erro!<br>Tipo de ficheiro incorreto.<br>Só é permitida a extensão de ficheiro TML!<br>"
            }
            if (val == "tml_big_file") {
                val = "Erro!<br>O tamanho do ficheiro excedeu 30 MB.<br>Só são suportados ficheiros TML de 30 MB!<br>"
            }
            if (val == "tml_bad_file") {
                val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a correção do suporte!<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "Erro!<br>Ocorreu um erro inesperado durante a leitura do ficheiro.<br>Verifique a ligação e a correção do suporte!<br>"
            }

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
        if (td_lng == 5) {
            if (val == "downl_start") {val = "下載已開始"}
            if (val == "success") {val = "success"}
            if (val == "error") {val = "error"}
            if (val == "android_interface_err") {val = "錯誤：Android 介面不可用"}

            if (val == "import_no_file") {val = "警告！<br>請只選擇允許的檔案。<br>謝謝！<br>"}
            if (val == "import_bad_ext_file") {val = "錯誤！<br>檔案類型不正確。<br>僅允許允許的檔案副檔名！<br>"}
            if (val == "import_big_file") {val = "錯誤！<br>超過 30MB 大小。<br>僅允許 30Mb 檔案資料！<br>"}
            if (val == "import_bad_file") {val = "錯誤！<br>讀取檔案時發生意外錯誤。<br>請檢查連接和媒體的正確性！<br>"}

            if (val == "gif_no_file") {
                val = "警告!<br>请选择任何 GIF 文件。<br>谢谢！<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "错误!<br>文件类型不正确。<br>只允许 GIF 文件扩展名！<br>"
            }
            if (val == "gif_big_file") {
                val = "错误!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 GIF 文件！<br>"
            }
            if (val == "gif_bad_file") {
                val = "错误!<br>读取文件时发生意外错误。<br>请检查连接和介质的正确性！<br>"
            }

            if (val == "jpg_no_file") {
                val = "警告!<br>请选择任何 JPG 文件。<br>谢谢！<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "错误!<br>文件类型不正确。<br>只允许 JPG 文件扩展名！<br>"
            }
            if (val == "jpg_big_file") {
                val = "错误!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 JPG 文件！<br>"
            }
            if (val == "jpg_bad_file") {
                val = "错误!<br>读取文件时发生意外错误。<br>请检查连接和介质的正确性！<br>"
            }

            if (val == "ch_big_depth") {val = "深度值的差異超過了距離！無法使用這些參數建立路線。請修正距離或深度。距離值必須大於目前深度和建立的深度之間的差異。"}

            if (val == "big_file_url") {val = "地圖上的 URI 連結元素太多！請移除部分元素以縮小地圖的大小。URI 連結的大小不能超過 8000 個字元。"}
            if (val == "ch_alert"){val = "警報"}
            if (val == "ch_info"){val = "訊息"}
            if(val == "ch_suc") {val = "成功"}
            if (val == "ch_warn") {val = "警告"}
            if (val == "ch_cus") {val = "自訂"}

            if (val == "td_in") {val = "在"}
            if (val == "td_out") {val ="輸出"}
            if (val == "td_f_line") {val = "點選<b>終點</b><br>"}
            if (val == "td_delete_pnt") {val = "按下 SHIFT 鍵並點選以<b>刪除點</b>"}
            if (val == "td_move_pnt") {val = "點選並拖曳以<b>移動點</b><br>"}
            if (val == "td_res_line") {val = "<br>按下 CTRL 鍵並點選以<b>恢復行</b>"}
            if (val == "td_add_pnt") {val = "按下 CTRL 鍵並點選以<b>新增點</b>"}
            if (val == "td_mtr") {val ="米"}
            if (val == "td_km") {val = "公里"}
            if (val == "td_ft") {val = "英尺"}
            if (val == "td_mi") {val = "英里"}
            if (val == "td_nm") {val = "海裡"}

            if(val  == "ch_lnkClipboard_URL"){val = "恭喜！<br>地圖已成功載入並可檢視。<br>請點選檢視地圖！"}
            if(val  == "ch_lnkClipboard"){val = "您的计划链接已复制到剪贴板！"}
            if (val == "td_depth") {
                val = "深度"
            }
            if (val == "td_distance") {
                val = "距離"
            }
            if (val == "bad_file_format") {
                val = "错误!<br>文件格式不正确或数据已损坏或不兼容。<br>检查保存或导出设置或文件数据的一致性！<br>"
            }
            if (val == "csv_no_file") {
                val = "警告!<br>请选择任何 CSV 文件。<br>谢谢！<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "错误!<br>文件类型不正确。<br>只允许 CSV 文件扩展名！<br>"
            }
            if (val == "csv_big_file") {
                val = "错误!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 CSV 文件！<br>"
            }
            if (val == "csv_bad_file") {
                val = "错误!<br>读取文件时发生意外错误。<br>请检查连接和介质的正确性！<br>"
            }

            if (val == "geojson_no_file") {
                val = "警告!<br>请选择任何 GeoJSON 文件。<br>谢谢！<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "错误!<br>文件类型不正确。<br>只允许 GeoJSON 文件扩展名！<br>"
            }
            if (val == "geojson_big_file") {
                val = "错误!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 GeoJSON 文件！<br>"
            }
            if (val == "geojson_bad_file") {
                val = "错误!<br>读取文件时发生意外错误。<br>请检查连接和介质的正确性！<br>"
            }

            if (val == "kml_no_file") {
                val = "警告!<br>请选择任何 KML 文件。<br>谢谢！<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "错误!<br>文件类型不正确。<br>只允许 KML 文件扩展名！<br>"
            }
            if (val == "kml_big_file") {
                val = "错误!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 KML 文件！<br>"
            }
            if (val == "kml_bad_file") {
                val = "错误!<br>读取文件时发生意外错误。<br>请检查连接和介质的正确性！<br>"
            }

            if (val == "tml_no_file") {
                val = "警告!<br>请选择任何 TML 文件。<br>谢谢！<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "错误!<br>文件类型不正确。<br>只允许 TML 文件扩展名！<br>"
            }
            if (val == "tml_big_file") {
                val = "错误!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 TML 文件！<br>"
            }
            if (val == "tml_bad_file") {
                val = "错误!<br>读取文件时发生意外错误。<br>请检查连接和介质的正确性！<br>"
            }

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
                val = "错误!<br>文件类型不正确。<br>只允许 GPX 文件扩展名！<br>"
            }
            if (val == "gpx_big_file") {
                val = "错误!<br>文件大小超过 30 MB。<br>只支持 30 MB 的 GPX 文件！<br>"
            }
            if (val == "gpx_bad_file") {
                val = "错误!<br>读取文件时发生意外错误。<br>请检查连接和介质的正确性！<br>"
            }

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
        if (td_lng == 6) {
            if (val == "downl_start") {val = "Изтеглянето започна"}
            if (val == "success") {val = "успех"}
            if (val == "error") {val = "грешка"}
            if (val == "android_interface_err") {val = "Грешка: Интерфейсът на Android не е наличен"}

            if (val == "import_no_file") {val = "Предупреждение!<br>Моля, изберете само разрешен файл.<br>Благодарим ви!<br>"}
            if (val == "import_bad_ext_file") {val = "Грешка!<br>Неправилен тип файл.<br>Разрешава се само разрешено файлово разширение!<br>"}
            if (val == "import_big_file") {val = "Грешка!<br>Превишен размер от 30MB.<br>Могат да бъдат разрешени само 30Mb файлови данни!<br>"}
            if (val == "import_bad_file") {val = "Грешка!<br>Възникна неочаквана грешка при четене на файла.<br>Проверете връзката и коректността на носителя!<br>"}

            if (val == "gif_no_file") {
                val = "Предупреждение!<br>Изберете произволен GIF файл.<br>Благодаря ви!<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "Грешка!<br>Неправилен тип файл.<br>Разрешено е само разширението на файла GIF!<br>"
            }
            if (val == "gif_big_file") {
                val = "Грешка!<br>Размерът на файла е над 30 MB.<br>Поддържат се само 30 MB GIF файлове!<br>"
            }
            if (val == "gif_bad_file") {
                val = "Грешка!<br>По време на четенето на файла е възникнала неочаквана грешка.<br>Моля, проверете правилната връзка и медия!<br>"
            }

            if (val == "jpg_no_file") {
                val = "Предупреждение!<br>Изберете произволен JPG файл.<br>Благодаря ви!<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "Грешка!<br>Неправилен тип файл.<br>Разрешено е само разширението на файла JPG!<br>"
            }
            if (val == "jpg_big_file") {
                val = "Грешка!<br>Размерът на файла е над 30 MB.<br>Поддържат се само 30 MB JPG файлове!<br>"
            }
            if (val == "jpg_bad_file") {
                val = "Грешка!<br>По време на четенето на файла е възникнала неочаквана грешка.<br>Моля, проверете правилната връзка и медия!<br>"
            }

            if (val == "ch_big_depth") {val = "Разликата в стойността на дълбочината надвишава разстоянието! Не е възможно да се изгради маршрут с тези параметри. Моля, коригирайте разстоянието или дълбочината. Стойността на разстоянието трябва да е по-голяма от разликата между текущата дълбочина и създадената дълбочина."}

            if (val == "big_file_url") {val = "Твърде много елементи на картата за връзка с URI! Моля, премахнете някои от елементите, за да намалите размера на картата. Размерът на URI връзката не може да надвишава 8000 символа."}
            if (val == "ch_alert") {val = "Оповещение"}
            if (val == "ch_info") {val = "Информация"}
            if (val == "ch_suc") {val = "Успех"}
            if (val == "ch_warn") {val = "Предупреждение"}
            if (val == "ch_cus") {val = "Пользовательский"}

            if (val == "td_in") {val = "В"}
            if (val == "td_out") {val = "Извън"}
            if (val == "td_f_line") {val = "Щракнете за <b>финална линия</b><br>"}
            if (val == "td_delete_pnt") {val = "Натиснете клавиша SHIFT и щракнете, за да <b>изтриете точка</b>"}
            if (val == "td_move_pnt") {val = "Щракнете и плъзнете, за да <b>преместите точка</b><br>"}
            if (val == "td_res_line") {val = "<br>Натиснете клавиша CTRL и щракнете, за да <b>възобновите ред</b>"}
            if (val == "td_add_pnt") {val = "Натиснете клавиша CTRL и щракнете, за да <b>добавите точка</b>"}
            if (val == "td_mtr") {val = "м"}
            if (val == "td_km") {val = "км"}
            if (val == "td_ft") {val = "фт"}
            if (val == "td_mi") {val = "mi"}
            if (val == "td_nm") {val = "nm"}

            if(val  == "ch_lnkClipboard_URL"){val = "Поздравления!<br>Картата е успешно заредена и готова за преглед.<br>Моля, докоснете, за да видите картата!"}
            if(val  == "ch_lnkClipboard"){val = "Връзката с вашия план е копирана в клипборда!"}
            if (val == "td_depth") {
                val = "дълбочина"
            }
            if (val == "td_distance") {
                val = "разстояние"
            }
            if (val == "bad_file_format") {
                val = "Грешка!<br>Неправилен файлов формат или повредени или несъвместими данни.<br>Проверете настройките за запазване или експортиране или съвместимостта на данните във файла!<br>"
            }
            if (val == "csv_no_file") {
                val = "Предупреждение!<br>Изберете произволен CSV файл.<br>Благодаря ви!<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "Грешка!<br>Неправилен тип файл.<br>Разрешено е само разширението на файла CSV!<br>"
            }
            if (val == "csv_big_file") {
                val = "Грешка!<br>Размерът на файла е над 30 MB.<br>Поддържат се само 30 MB CSV файлове!<br>"
            }
            if (val == "csv_bad_file") {
                val = "Грешка!<br>По време на четенето на файла е възникнала неочаквана грешка.<br>Моля, проверете правилната връзка и медия!<br>"
            }

            if (val == "geojson_no_file") {
                val = "Предупреждение!<br>Изберете произволен GeoJSON файл.<br>Благодаря ви!<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "Грешка!<br>Неправилен тип файл.<br>Разрешено е само разширението на файла GeoJSON!<br>"
            }
            if (val == "geojson_big_file") {
                val = "Грешка!<br>Размерът на файла е над 30 MB.<br>Поддържат се само 30 MB GeoJSON файлове!<br>"
            }
            if (val == "geojson_bad_file") {
                val = "Грешка!<br>По време на четенето на файла е възникнала неочаквана грешка.<br>Моля, проверете правилната връзка и медия!<br>"
            }

            if (val == "kml_no_file") {
                val = "Предупреждение!<br>Изберете произволен KML файл.<br>Благодаря ви!<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "Грешка!<br>Неправилен тип файл.<br>Разрешено е само разширението на файла KML!<br>"
            }
            if (val == "kml_big_file") {
                val = "Грешка!<br>Размерът на файла е над 30 MB.<br>Поддържат се само 30 MB KML файлове!<br>"
            }
            if (val == "kml_bad_file") {
                val = "Грешка!<br>По време на четенето на файла е възникнала неочаквана грешка.<br>Моля, проверете правилната връзка и медия!<br>"
            }

            if (val == "tml_no_file") {
                val = "Предупреждение!<br>Изберете произволен TML файл.<br>Благодаря ви!<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "Грешка!<br>Неправилен тип файл.<br>Разрешено е само разширението на файла TML!<br>"
            }
            if (val == "tml_big_file") {
                val = "Грешка!<br>Размерът на файла е над 30 MB.<br>Поддържат се само 30 MB TML файлове!<br>"
            }
            if (val == "tml_bad_file") {
                val = "Грешка!<br>По време на четенето на файла е възникнала неочаквана грешка.<br>Моля, проверете правилната връзка и медия!<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "Грешка!<br>По време на четенето на файла е възникнала неочаквана грешка.<br>Моля, проверете правилната връзка и медия!<br>"
            }
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
        if (td_lng == 7) {
            if (val == "downl_start") {val = "Téléchargement démarré"}
            if (val == "success") {val = "success"}
            if (val == "error") {val = "error"}
            if (val == "android_interface_err") {val = "Erreur: Interface Android non disponible"}

            if (val == "import_no_file") {val = "Attention!<br>Veuillez sélectionner uniquement les fichiers autorisés.<br>Merci!<br>"}
            if (val == "import_bad_ext_file") {val = "Erreur!<br>Type de fichier incorrect.<br>Seule l'extension de fichier autorisée est autorisée!<br>"}
            if (val == "import_big_file") {val = "Erreur!<br>Taille dépassée: 30Mo.<br>Seules les données de fichier de 30Mo peuvent être autorisées!<br>"}
            if (val == "import_bad_file") {val = "Erreur!<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Vérifiez la connexion et l'exactitude du support!<br>"}

            if (val == "gif_no_file") {
                val = "Attention !<br>Veuillez sélectionner n'importe quel fichier GIF.<br>Merci d'avance !<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "Erreur !<br>Type de fichier incorrect.<br>Seule l'extension de fichier GIF est autorisée !<br>"
            }
            if (val == "gif_big_file") {
                val = "Erreur !<br>La taille du fichier a dépassé 30 Mo.<br>Seuls les fichiers GIF de 30 Mo sont pris en charge !<br>"
            }
            if (val == "gif_bad_file") {
                val = "Erreur !<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Veuillez vérifier que la connexion et le support sont corrects !<br>"
            }

            if (val == "jpg_no_file") {
                val = "Attention !<br>Veuillez sélectionner n'importe quel fichier JPG.<br>Merci d'avance !<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "Erreur !<br>Type de fichier incorrect.<br>Seule l'extension de fichier JPG est autorisée !<br>"
            }
            if (val == "jpg_big_file") {
                val = "Erreur !<br>La taille du fichier a dépassé 30 Mo.<br>Seuls les fichiers JPG de 30 Mo sont pris en charge !<br>"
            }
            if (val == "jpg_bad_file") {
                val = "Erreur !<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Veuillez vérifier que la connexion et le support sont corrects !<br>"
            }

            if (val == "ch_big_depth") {val = "La différence de profondeur dépasse la distance! Impossible de construire un itinéraire avec ces paramètres. Veuillez corriger la distance ou la profondeur. La valeur de distance doit être supérieure à la différence entre la profondeur actuelle et la profondeur créée."}

            if (val == "big_file_url") {val = "Trop d'éléments sur la carte pour le lien URI ! Veuillez supprimer certains éléments pour réduire la taille de la carte. La taille du lien URI ne doit pas dépasser 8000 caractères."}
            if (val == "ch_alert") {val = "Alerte"}
            if (val == "ch_info") {val = "Info"}
            if (val == "ch_suc") {val = "Succès"}
            if (val == "ch_warn") {val = "Avertissement"}
            if (val == "ch_cus") {val = "Personnalisé"}

            if (val == "td_in") {val = "Entrée"}
            if (val == "td_out") {val = "Sortie"}
            if (val == "td_f_line") {val = "Cliquez pour <b>arriver</b><br>"}
            if (val == "td_delete_pnt") {val = "Appuyez sur la touche MAJ et cliquez pour <b>supprimer un point</b>"}
            if (val == "td_move_pnt") {val = "Cliquez et faites glisser pour <b>déplacer un point</b><br>"}
            if (val == "td_res_line") {val = "<br>Appuyez sur la touche CTRL et cliquez pour <b>reprendre la ligne</b>"}
            if (val == "td_add_pnt") {val = "Appuyez sur la touche CTRL et cliquez pour <b>ajouter un point</b>"}
            if (val == "td_mtr") {val = "m"}
            if (val == "td_km") {val = "km"}
            if (val == "td_ft") {val = "ft"}
            if (val == "td_mi") {val = "mi"}
            if (val == "td_nm") {val = "nm"}

            if(val  == "ch_lnkClipboard_URL"){val = "Félicitations!<br>La carte a été chargée avec succès et est prête à être visualisée.<br>Tapez sur la carte pour la visualiser !"}
            if(val  == "ch_lnkClipboard"){val = "Le lien avec votre plan a été copié dans le presse-papiers !"}
            if (val == "td_depth") {
                val = "profondeur"
            }
            if (val == "td_distance") {
                val = "distance"
            }
            if (val == "bad_file_format") {
                val = "Erreur !<br>Format de fichier incorrect ou données endommagées ou incompatibles.<br>Vérifier les paramètres d'enregistrement ou d'exportation ou la cohérence des données du fichier !<br>"
            }
            if (val == "csv_no_file") {
                val = "Attention !<br>Veuillez sélectionner n'importe quel fichier CSV.<br>Merci d'avance !<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "Erreur !<br>Type de fichier incorrect.<br>Seule l'extension de fichier CSV est autorisée !<br>"
            }
            if (val == "csv_big_file") {
                val = "Erreur !<br>La taille du fichier a dépassé 30 Mo.<br>Seuls les fichiers CSV de 30 Mo sont pris en charge !<br>"
            }
            if (val == "csv_bad_file") {
                val = "Erreur !<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Veuillez vérifier que la connexion et le support sont corrects !<br>"
            }

            if (val == "geojson_no_file") {
                val = "Attention !<br>Veuillez sélectionner n'importe quel fichier GeoJSON.<br>Merci d'avance !<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "Erreur !<br>Type de fichier incorrect.<br>Seule l'extension de fichier GeoJSON est autorisée !<br>"
            }
            if (val == "geojson_big_file") {
                val = "Erreur !<br>La taille du fichier a dépassé 30 Mo.<br>Seuls les fichiers GeoJSON de 30 Mo sont pris en charge !<br>"
            }
            if (val == "geojson_bad_file") {
                val = "Erreur !<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Veuillez vérifier que la connexion et le support sont corrects !<br>"
            }

            if (val == "kml_no_file") {
                val = "Attention !<br>Veuillez sélectionner n'importe quel fichier KML.<br>Merci d'avance !<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "Erreur !<br>Type de fichier incorrect.<br>Seule l'extension de fichier KML est autorisée !<br>"
            }
            if (val == "kml_big_file") {
                val = "Erreur !<br>La taille du fichier a dépassé 30 Mo.<br>Seuls les fichiers KML de 30 Mo sont pris en charge !<br>"
            }
            if (val == "kml_bad_file") {
                val = "Erreur !<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Veuillez vérifier que la connexion et le support sont corrects !<br>"
            }

            if (val == "tml_no_file") {
                val = "Attention !<br>Veuillez sélectionner n'importe quel fichier TML.<br>Merci d'avance !<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "Erreur !<br>Type de fichier incorrect.<br>Seule l'extension de fichier TML est autorisée !<br>"
            }
            if (val == "tml_big_file") {
                val = "Erreur !<br>La taille du fichier a dépassé 30 Mo.<br>Seuls les fichiers TML de 30 Mo sont pris en charge !<br>"
            }
            if (val == "tml_bad_file") {
                val = "Erreur !<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Veuillez vérifier que la connexion et le support sont corrects !<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "Erreur !<br>Une erreur inattendue s'est produite lors de la lecture du fichier.<br>Veuillez vérifier que la connexion et le support sont corrects !<br>"
            }

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
        if (td_lng == 8) {
            if (val == "downl_start") {val = "다운로드가 시작되었습니다"}
            if (val == "success") {val = "success"}
            if (val == "error") {val = "error"}
            if (val == "android_interface_err") {val = "오류: Android 인터페이스를 사용할 수 없습니다"}

            if (val == "import_no_file") {val = "경고!<br>허용된 파일만 선택하세요.<br>감사합니다!<br>"}
            if (val == "import_bad_ext_file") {val = "오류!<br>잘못된 파일 형식입니다.<br>허용된 파일 확장자만 허용됩니다!<br>"}
            if (val == "import_big_file") {val = "오류!<br>크기가 30MB를 초과했습니다.<br>파일 데이터는 30MB만 허용됩니다!<br>"}
            if (val == "import_bad_file") {val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>연결 상태와 미디어의 정확성을 확인하세요!<br>"}

            if (val == "gif_no_file") {
                val = "경고!<br>GIF 파일을 선택하세요.<br>감사합니다!<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "오류!<br>파일 형식이 잘못되었습니다.<br>GIF 파일 확장자만 허용됩니다!<br>"
            }
            if (val == "gif_big_file") {
                val = "오류!<br>파일 크기가 30MB를 초과했습니다.<br>30MB GIF 파일만 지원됩니다!<br>"
            }
            if (val == "gif_bad_file") {
                val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>올바른 연결 및 미디어를 확인하세요!<br>"
            }

            if (val == "jpg_no_file") {
                val = "경고!<br>JPG 파일을 선택하세요.<br>감사합니다!<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "오류!<br>파일 형식이 잘못되었습니다.<br>JPG 파일 확장자만 허용됩니다!<br>"
            }
            if (val == "jpg_big_file") {
                val = "오류!<br>파일 크기가 30MB를 초과했습니다.<br>30MB JPG 파일만 지원됩니다!<br>"
            }
            if (val == "jpg_bad_file") {
                val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>올바른 연결 및 미디어를 확인하세요!<br>"
            }

            if (val == "ch_big_depth") {val = "깊이 값의 차이가 거리를 초과합니다! 이 매개변수로 경로를 구축할 수 없습니다. 거리 또는 깊이를 수정하세요. 거리 값은 현재 깊이와 생성된 깊이의 차이보다 커야 합니다."}

            if (val == "big_file_url") {val = "지도의 요소가 너무 많아 URI 링크가 불가능합니다! 지도의 크기를 줄이려면 일부 요소를 제거하세요. URI 링크의 크기는 8000자를 초과할 수 없습니다."}
            if (val == "ch_alert") {val = "경고"}
            if (val == "ch_info") {val = "정보"}
            if (val == "ch_suc") {val = "성공"}
            if (val == "ch_warn") {val = "경고"}
            if (val == "ch_cus") {val = "사용자 지정"}

            if (val == "td_in") {val = "에"}
            if (val == "td_out") {val = "아웃"}
            if (val == "td_f_line") {val = "클릭하여 <b>라인을 완성</b><br>"}
            if (val == "td_delete_pnt") {val = "SHIFT 키를 누르고 클릭하여 <b>포인트를 삭제</b>"}
            if (val == "td_move_pnt") {val = "클릭하여 드래그하여 <b>포인트를 이동</b><br>"}
            if (val == "td_res_line") {val = "<br>CTRL 키를 누르고 클릭하여 <b>라인을 다시 시작합니다</b>"}
            if (val == "td_add_pnt") {val = "CTRL 키를 누르고 클릭하여 <b>포인트를 추가합니다</b>"}
            if (val == "td_mtr") {val = "m"}
            if (val == "td_km") {val = "km"}
            if (val == "td_ft") {val = "ft"}
            if (val == "td_mi") {val = "mi"}
            if (val == "td_nm") {val = "nm"}

            if(val  == "ch_lnkClipboard_URL"){val = "축하합니다!<br>지도가 성공적으로 로드되어 볼 준비가 되었습니다.<br>지도를 보려면 탭하세요!"}
            if(val  == "ch_lnkClipboard"){val = "요금제 링크가 클립보드에 복사되었습니다!"}
            if (val == "td_depth") {
                val = "깊이"
            }
            if (val == "td_distance") {
                val = "거리"
            }
            if (val == "bad_file_format") {
                val = "오류!<br>파일 형식이 잘못되었거나 데이터가 손상되었거나 호환되지 않습니다.<br>저장 또는 내보내기 설정 또는 파일 데이터 일관성을 확인하세요!<br>"
            }
            if (val == "csv_no_file") {
                val = "경고!<br>CSV 파일을 선택하세요.<br>감사합니다!<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "오류!<br>파일 형식이 잘못되었습니다.<br>CSV 파일 확장자만 허용됩니다!<br>"
            }
            if (val == "csv_big_file") {
                val = "오류!<br>파일 크기가 30MB를 초과했습니다.<br>30MB CSV 파일만 지원됩니다!<br>"
            }
            if (val == "csv_bad_file") {
                val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>올바른 연결 및 미디어를 확인하세요!<br>"
            }

            if (val == "geojson_no_file") {
                val = "경고!<br>GeoJSON 파일을 선택하세요.<br>감사합니다!<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "오류!<br>파일 형식이 잘못되었습니다.<br>GeoJSON 파일 확장자만 허용됩니다!<br>"
            }
            if (val == "geojson_big_file") {
                val = "오류!<br>파일 크기가 30MB를 초과했습니다.<br>30MB GeoJSON 파일만 지원됩니다!<br>"
            }
            if (val == "geojson_bad_file") {
                val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>올바른 연결 및 미디어를 확인하세요!<br>"
            }

            if (val == "kml_no_file") {
                val = "경고!<br>KML 파일을 선택하세요.<br>감사합니다!<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "오류!<br>파일 형식이 잘못되었습니다.<br>KML 파일 확장자만 허용됩니다!<br>"
            }
            if (val == "kml_big_file") {
                val = "오류!<br>파일 크기가 30MB를 초과했습니다.<br>30MB KML 파일만 지원됩니다!<br>"
            }
            if (val == "kml_bad_file") {
                val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>올바른 연결 및 미디어를 확인하세요!<br>"
            }

            if (val == "tml_no_file") {
                val = "경고!<br>TML 파일을 선택하세요.<br>감사합니다!<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "오류!<br>파일 형식이 잘못되었습니다.<br>TML 파일 확장자만 허용됩니다!<br>"
            }
            if (val == "tml_big_file") {
                val = "오류!<br>파일 크기가 30MB를 초과했습니다.<br>30MB TML 파일만 지원됩니다!<br>"
            }
            if (val == "tml_bad_file") {
                val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>올바른 연결 및 미디어를 확인하세요!<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "오류!<br>파일을 읽는 동안 예기치 않은 오류가 발생했습니다.<br>올바른 연결 및 미디어를 확인하세요!<br>"
            }
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
        if (td_lng == 9) {
            if (val == "downl_start") {val = "Download avviato"}
            if (val == "success") {val = "success"}
            if (val == "error") {val = "error"}
            if (val == "android_interface_err") {val = "Errore: interfaccia Android non disponibile"}

            if (val == "import_no_file") {val = "Attenzione!<br>Seleziona solo i file consentiti.<br>Grazie!<br>"}
            if (val == "import_bad_ext_file") {val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione di file consentita!<br>"}
            if (val == "import_big_file") {val = "Errore!<br>Dimensione superata 30 MB.<br>Sono consentiti solo file da 30 MB!<br>"}
            if (val == "import_bad_file") {val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e la correttezza del supporto!<br>"}

            if (val == "gif_no_file") {
                val = "Attenzione!<br>Selezionare un file GIF qualsiasi.<br>Grazie!<br>"
            }
            if (val == "gif_bad_ext_file") {
                val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione GIF!<br>"
            }
            if (val == "gif_big_file") {
                val = "Errore!<br>La dimensione del file ha superato i 30 MB.<br>Sono supportati solo i file GIF da 30 MB!<br>"
            }
            if (val == "gif_bad_file") {
                val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e il supporto corretti!<br>"
            }

            if (val == "jpg_no_file") {
                val = "Attenzione!<br>Selezionare un file JPG qualsiasi.<br>Grazie!<br>"
            }
            if (val == "jpg_bad_ext_file") {
                val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione JPG!<br>"
            }
            if (val == "jpg_big_file") {
                val = "Errore!<br>La dimensione del file ha superato i 30 MB.<br>Sono supportati solo i file JPG da 30 MB!<br>"
            }
            if (val == "jpg_bad_file") {
                val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e il supporto corretti!<br>"
            }

            if (val == "ch_big_depth") {val = "La differenza nel valore di profondità supera la distanza! Non è possibile creare un percorso con questi parametri. Correggi la distanza o la profondità. Il valore di distanza deve essere maggiore della differenza tra la profondità corrente e la profondità creata."}

            if (val == "big_file_url") {val = "Troppi elementi sulla mappa per il link URI! Si prega di rimuovere alcuni elementi per ridurre le dimensioni della mappa. La dimensione del link URI non può superare gli 8000 caratteri."}
            if (val == "ch_alert") {val = "Avviso"}
            if (val == "ch_info") {val = "Info"}
            if (val == "ch_suc") {val = "Successo"}
            if (val == "ch_warn") {val = "Avviso"}
            if (val == "ch_cus") {val = "Personalizzato"}

            if (val == "td_in") {val = "In"}
            if (val == "td_out") {val = "Out"}
            if (val == "td_f_line") {val = "Clicca per <b>traguardo</b><br>"}
            if (val == "td_delete_pnt") {val = "Premi il tasto MAIUSC e clicca per <b>eliminare il punto</b>"}
            if (val == "td_move_pnt") {val = "Clicca e trascina per <b>spostare il punto</b><br>"}
            if (val == "td_res_line") {val = "<br>Premi il tasto CTRL e clicca per <b>riprendere la linea</b>"}
            if (val == "td_add_pnt") {val = "Premi il tasto CTRL e clicca per <b>aggiungere un punto</b>"}
            if (val == "td_mtr") {val = "m"}
            if (val == "td_km") {val = "km"}
            if (val == "td_ft") {val = "ft"}
            if (val == "td_mi") {val = "mi"}
            if (val == "td_nm") {val = "nm"}

            if(val  == "ch_lnkClipboard_URL"){val = "Congratulazioni!<br>La mappa è stata caricata con successo ed è pronta per essere visualizzata.<br>Toccare per visualizzare la mappa!"}
            if(val  == "ch_lnkClipboard"){val = "Il link al piano è stato copiato negli appunti!"}
            if (val == "td_depth") {
                val = "profondità"
            }
            if (val == "td_distance") {
                val = "distanza"
            }
            if (val == "bad_file_format") {
                val = "Errore!<br>Il formato del file non è valido, i dati sono corrotti o incompatibili.<br>Controllare le impostazioni di salvataggio o esportazione o la coerenza dei dati del file!<br>"
            }
            if (val == "csv_no_file") {
                val = "Attenzione!<br>Selezionare un file CSV qualsiasi.<br>Grazie!<br>"
            }
            if (val == "csv_bad_ext_file") {
                val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione CSV!<br>"
            }
            if (val == "csv_big_file") {
                val = "Errore!<br>La dimensione del file ha superato i 30 MB.<br>Sono supportati solo i file CSV da 30 MB!<br>"
            }
            if (val == "csv_bad_file") {
                val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e il supporto corretti!<br>"
            }

            if (val == "geojson_no_file") {
                val = "Attenzione!<br>Selezionare un file GeoJSON qualsiasi.<br>Grazie!<br>"
            }
            if (val == "geojson_bad_ext_file") {
                val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione GeoJSON!<br>"
            }
            if (val == "geojson_big_file") {
                val = "Errore!<br>La dimensione del file ha superato i 30 MB.<br>Sono supportati solo i file GeoJSON da 30 MB!<br>"
            }
            if (val == "geojson_bad_file") {
                val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e il supporto corretti!<br>"
            }

            if (val == "kml_no_file") {
                val = "Attenzione!<br>Selezionare un file KML qualsiasi.<br>Grazie!<br>"
            }
            if (val == "kml_bad_ext_file") {
                val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione KML!<br>"
            }
            if (val == "kml_big_file") {
                val = "Errore!<br>La dimensione del file ha superato i 30 MB.<br>Sono supportati solo i file KML da 30 MB!<br>"
            }
            if (val == "kml_bad_file") {
                val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e il supporto corretti!<br>"
            }

            if (val == "tml_no_file") {
                val = "Attenzione!<br>Selezionare un file TML qualsiasi.<br>Grazie!<br>"
            }
            if (val == "tml_bad_ext_file") {
                val = "Errore!<br>Tipo di file non corretto.<br>È consentita solo l'estensione TML!<br>"
            }
            if (val == "tml_big_file") {
                val = "Errore!<br>La dimensione del file ha superato i 30 MB.<br>Sono supportati solo i file TML da 30 MB!<br>"
            }
            if (val == "tml_bad_file") {
                val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e il supporto corretti!<br>"
            }

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
            if (val == "gpx_bad_file") {
                val = "Errore!<br>Si è verificato un errore imprevisto durante la lettura del file.<br>Controllare la connessione e il supporto corretti!<br>"
            }
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

    //translate layer map selector
    function translate_map_selector(td_lng, lr1, lr2) {
        var translate = [];
        //eng
        if (td_lng == 1) {
            translate = {
                "Empty": L.tileLayer(""),
                "Streets": lr1,
                "Satellite": lr2,
            }
        }
        //ru
        if (td_lng == 2) {
            translate = {
                "Пустая карта": L.tileLayer(""),
                "Улицы": lr1,
                "Спутниковая карта": lr2,
            }
        }
        //sp
        if (td_lng == 3) {
            translate = {
                "Vacío": L.tileLayer(""),
                "Calles": osm,
                "Satélite": esri,
            }
        }
        //pt
        if (td_lng == 4) {
            translate = {
                "Vazio": L.tileLayer(""),
                "Ruas": lr1,
                "Satélite": lr2,
            }
        }
        //ch
        if (td_lng == 5) {
            translate = {
                "空": L.tileLayer(""),
                "街道": lr1,
                "衛星": lr2,
            }
        }
        //br
        if (td_lng == 6) {
            translate = {
                "Празен": L.tileLayer(""),
                "Улици": lr1,
                "Сателит": lr2,
            }
        }
        //fr
        if (td_lng == 7) {
            translate = {
                "Vide": L.tileLayer(""),
                "Rues": lr1,
                "Satellite": lr2,
            }
        }
        //kr
        if (td_lng == 8) {
            translate = {
                "비어 있음": L.tileLayer(""),
                "거리": lr1,
                "위성": lr2,
            }
        }
        //it
        if (td_lng == 9) {
            translate = {
                "Vuoto": L.tileLayer(""),
                "Strade": lr1,
                "Il satellite": lr2,
            }
        }
        return translate;
    }