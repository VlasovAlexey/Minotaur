function upd_igrf(){
    if($("#igrf_13_opt").val() == 1){
        element_id_show("tr_igrf_13_val");
    }
    if($("#igrf_13_opt").val() == 2){
        element_id_hide("tr_igrf_13_val");
        $(".igrf_13_val_opt").val("0,0");
    }
    //upd_all();
}