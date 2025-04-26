//add button for outline tool
const outline_tool = [
    "cancel",
  ];
  
  map_editor.pm.Toolbar.createCustomControl({
    block: "custom",
    name: " outline_tool",
    actions: outline_tool,
    title: "",
    onClick: () => {
    },
    afterClick: () => {
    },
    doToggle: true,
    toggleStatus: false,
    disableOtherButtons: true,
    className: 'control-icon leaflet-control-outline',
  });
  