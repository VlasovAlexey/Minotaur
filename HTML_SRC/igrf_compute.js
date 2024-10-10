function upd_igrf(){
    if($("#igrf_13_opt").val() == 1){
        element_id_show("tr_igrf_13_val");
        element_id_show_inline("btn_wmm");
    }
    if($("#igrf_13_opt").val() == 2){
        element_id_hide("tr_igrf_13_val");
        element_id_hide("btn_wmm");
        $(".igrf_13_val_opt").val("0,0");
    }
    //upd_all();
}