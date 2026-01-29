export interface RoofCommands {
  AddRoof: string;
  CreateRoof: string;
  EndRoofPreview: string;
  ChangeRoofParam: string;
  ToggleGenerateRoof: string;
  ReplaceRoof: string;
  UpdateRoofDirection: string;
  AddRoofMaterial: string;
}

const roofCommands: Readonly<RoofCommands> = Object.freeze({
  AddRoof: "hsw.plugin.roof.cmd.CmdAddRoof",
  CreateRoof: "hsw.plugin.roof.CmdCreateRoof",
  EndRoofPreview: "hsw.plugin.roof.CmdEndRoofPreview",
  ChangeRoofParam: "hsw.plugin.roof.CmdChangeRoofParam",
  ToggleGenerateRoof: "hsw.plugin.roof.CmdToggleGenerateRoof",
  ReplaceRoof: "hsw.plugin.roof.CmdReplaceRoof",
  UpdateRoofDirection: "hsw.plugin.roof.CmdUpdateRoofDirection",
  AddRoofMaterial: "hsw.plugin.roof.CmdAddRoofMaterial"
});

export default roofCommands;