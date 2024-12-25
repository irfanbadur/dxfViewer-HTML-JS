// JavaScript Document

  
function ArcToDXF(Arc){
	 if(asd==0x0A){
		asd=0xBC
	}
 
	var Color="";
	var Color24="";
	var Kalinlik="";
	var type="";
//------------------------------
	if(Arc.Color=="ByLayer")
	{Color=""}
	else if(Arc.Color=="ByBlock")
			{Color="\n62\n7"}
	else if(Arc.Color=="")
			{Color=""}
	else{
		Color="\n62\n"+Arc.Color;
	}
	if(Arc.Color24=="")
	{Color24=""}
	else{
		Color24="\n420\n"+Arc.Color24;
	}
//------------------------------
	if(Arc.Kalinlik=="ByLayer")
	{Kalinlik=""}
	else if(Arc.Kalinlik=="ByBlock")
			{Kalinlik="\n370\n-2"}
	else{
		Kalinlik="\n370\n"+Arc.Kalinlik;
	}			 
//------------------------------
	if(Arc.LineType=="ByLayer")
	{type=""}
	else if(Arc.LineType=="ByBlock")
			{type="\n6\nByBlock"}
	else{
		type="\n6\n"+Arc.LineType;
	}			 
//------------------------------
DXFVARLIK +="\nARC\n  5\n"+asd.toString(16).toUpperCase()+"\n330\n70\n100\nAcDbEntity\n  8\n"+Arc.layer+type+Color+Color24+Kalinlik+"\n100\nAcDbCircle\n 10\n"+Arc.x+"\n 20\n"+Arc.y+"\n 30\n0.0\n 40\n"+Arc.r+"\n100\nAcDbArc\n 50\n"+Arc.StartAngle+"\n 51\n"+Arc.EndAngle+"\n  0";
	var son2=DXFVARLIK.slice(DXFVARLIK.length-2,DXFVARLIK.length-1);		
	asd=asd+0x1
}
function SplineToDXF(Spline){
var Knots=Spline.Knots;
var KnotsSay=Knots.length
var Noktalar=Spline.Noktalar;
var NoktaSay=Noktalar.length
			if(asd==0x0A){
			  asd=0xBC
			}
	var Color="";
	var Color24="";
	var Kalinlik="";
	var type="";
	var LineScale="";
//------------------------------
	if(Spline.Color=="ByLayer")
	{Color=""}
	else if(Spline.Color=="ByBlock")
			{Color="\n62\n7"}
	else if(Spline.Color=="")
			{Color=""}
	else{
		Color="\n62\n"+Spline.Color;
	}
	if(Spline.Color24=="")
	{Color24=""}
	else{
		Color24="\n420\n"+Spline.Color24;
	}
//------------------------------
	if(Spline.Kalinlik=="ByLayer")
	{Kalinlik=""}
	else if(Spline.Kalinlik=="ByBlock")
			{Kalinlik="\n370\n-2"}
	else{
		Kalinlik="\n370\n"+Spline.Kalinlik;
	}			 
//------------------------------
	if(Spline.LineType=="ByLayer")
	{type=""}
	else if(Spline.LineType=="ByBlock")
			{type="\n6\nByBlock"}
	else{
		type="\n6\n"+Spline.LineType;
	}			 
//------------------------------
	if(Spline.LineScale=="")
	{LineScale=""}
	else{
		LineScale="\n48\n"+Spline.LineScale;
	}			 
//------------------------------"+Spline.layer+type+Color+Kalinlik+"
	
DXFVARLIK +="	\nSPLINE\n  5\n"+asd.toString(16).toUpperCase()+"\n330\n70\n100\nAcDbEntity\n  8\n"+Spline.layer+type+LineScale+Color+Color24+Kalinlik+"\n100\nAcDbSpline\n210\n0.0\n220\n0.0\n230\n1.0\n 70\n  1288\n 71\n     3\n 72\n    12\n 73\n     8\n 74\n     0\n 42\n0.000000001\n 43\n0.0000000001";
	
	//DXFVARLIK +="\nLWPOLYLINE\n5\n"+asd.toString(16).toUpperCase()+"\n330\n70\n100\nAcDbEntity\n 8\n"+Spline.layer+type+Color+Kalinlik+"\n100\nAcDbPolyline\n 90\n  11\n 70\n  0\n43\n0.0";
	for(var a=0;a<=KnotsSay-1;a++){
		DXFVARLIK +="\n 40\n"+Spline.Knots[a] ;
	}
	for(var a=0;a<=NoktaSay-2;a=a+3){
		DXFVARLIK +="\n 10\n"+Spline.Noktalar[a]+"\n 20\n"+Spline.Noktalar[a+1]+"\n 30\n0.0";
	}
	DXFVARLIK +="\n0";	
	var son2=DXFVARLIK.slice(DXFVARLIK.length-2,DXFVARLIK.length-1);
			asd=asd+0x1	
}
function CircleToDXF(Circle){
	 if(asd==0x0A){
		asd=0xBC
	}
	var Color="";
	var Color24="";
	var Kalinlik="";
	var type="";
//------------------------------
	if(Circle.Color=="ByLayer")
	{Color=""}
	else if(Circle.Color=="ByBlock")
			{Color="\n62\n7"}
	else if(Circle.Color=="")
			{Color=""}
	else{
		Color="\n62\n"+Circle.Color;
	}
	if(Circle.Color24=="")
	{Color24=""}
	else{
		Color24="\n420\n"+Circle.Color24;
	}
//------------------------------
	if(Circle.Kalinlik=="ByLayer")
	{Kalinlik=""}
	else if(Circle.Kalinlik=="ByBlock")
			{Kalinlik="\n370\n-2"}
	else{
		Kalinlik="\n370\n"+Circle.Kalinlik;
	}			 
//------------------------------
	if(Circle.LineType=="ByLayer")
	{type=""}
	else if(Circle.LineType=="ByBlock")
			{type="\n6\nByBlock"}
	else{
		type="\n6\n"+Circle.LineType;
	}			 
//------------------------------
	DXFVARLIK +="\nCIRCLE\n5\n"+asd.toString(16).toUpperCase()+"\n330\n70\n100\nAcDbEntity\n8\n"+Circle.layer+type+Color+Color24+Kalinlik+"\n100\nAcDbCircle\n10\n"+Circle.x+".0\n20\n"+Circle.y+"\n30\n0.0\n40\n"+Circle.r+"\n0"
	var son2=DXFVARLIK.slice(DXFVARLIK.length-2,DXFVARLIK.length-1);		
	asd=asd+0x1

}
function TextToDXF(Text){
	 if(asd==0x0A){
		asd=0xBC
	}
	var Color="";
	var Color24="";
	var Kalinlik="";
	var type="";
//------------------------------
	if(Text.Color=="ByLayer")
	{Color=""}
	else if(Text.Color=="ByBlock")
			{Color="\n62\n7"}
	else if(Text.Color=="")
			{Color=""}
	else{
		Color="\n62\n"+Text.Color;
	}
	if(Text.Color24=="")
	{Color24=""}
	else{
		Color24="\n420\n"+Text.Color24;
	}
//------------------------------
	if(Text.Kalinlik=="ByLayer")
	{Kalinlik=""}
	else if(Text.Kalinlik=="ByBlock")
			{Kalinlik="\n370\n-2"}
	else{
		Kalinlik="\n370\n"+Text.Kalinlik;
	}			 
//------------------------------
	if(Text.LineType=="ByLayer")
	{type=""}
	else if(Text.LineType=="ByBlock")
			{type="\n6\nByBlock"}
	else{
		type="\n6\n"+Text.LineType;
	}			 
//------------------------------
	
DXFVARLIK +="\nTEXT\n5\n"+asd.toString(16).toUpperCase()+"\n330\n70\n100\nAcDbEntity\n  8\n"+Text.layer+type+Color+Color24+Kalinlik+"\n100\nAcDbText\n 10\n"+Text.x+"\n 20\n"+Text.y+"\n 30\n0.0\n 40\n"+Text.TextH+"\n  1\n"+Text.TextString+"\n 50\n"+Text.TextArc+"\n100\nAcDbText\n0"

	
	var son2=DXFVARLIK.slice(DXFVARLIK.length-2,DXFVARLIK.length-1);		
	asd=asd+0x1

}
function LineToDXF(Line){
	 if(asd==0x0A){
		asd=0xBC
	}
	var Color="";
	var Color24="";
	var Kalinlik="";
	var type="";
	var LineScale="";
//------------------------------
	if(Line.Color=="ByLayer")
	{Color=""}
	else if(Line.Color=="ByBlock")
			{Color="\n62\n7"}
	else if(Line.Color=="")
			{Color=""}
	else{
		Color="\n62\n"+Line.Color;
	}
	if(Line.Color24=="")
	{Color24=""}
	else{
		Color24="\n420\n"+Line.Color24;
	}
//------------------------------
	if(Line.Kalinlik=="ByLayer")
	{Kalinlik=""}
	else if(Line.Kalinlik=="ByBlock")
			{Kalinlik="\n370\n-2"}
	else{
		Kalinlik="\n370\n"+Line.Kalinlik;
	}			 
//------------------------------
	if(Line.LineType=="ByLayer")
	{type=""}
	else if(Line.LineType=="ByBlock")
			{type="\n6\nByBlock"}
	else{
		type="\n6\n"+Line.LineType;
	}
//------------------------------
	if(Line.LineScale=="")
	{LineScale=""}
	else{
		LineScale="\n48\n"+Line.LineScale;
	}			 //------------------------------
			 
DXFVARLIK +="    \nLINE\n  5\n"+asd.toString(16).toUpperCase()+"\n330\n70\n100\nAcDbEntity\n  8\n"+Line.layer+type+LineScale+Color+Color24+Kalinlik+"\n100\nAcDbLine\n 10\n"+Line.x1+"\n 20\n"+Line.y1+"\n 30\n0.0\n 11\n"+Line.x2+"\n 21\n"+Line.y2+"\n 31\n0.0\n  0"
 

	
	var son2=DXFVARLIK.slice(DXFVARLIK.length-2,DXFVARLIK.length-1);		
	asd=asd+0x1

}
function PolylineToDXF(polyline){
	
var Noktalar=polyline.Noktalar;
var NoktaSay=Noktalar.length
	
			if(asd==0x0A){
			  asd=0xBC
			}
	var Color="";
	var Color24="";
	var Kalinlik="";
	var type="";
//------------------------------
	if(polyline.Color=="ByLayer")
	{Color=""}
	else if(polyline.Color=="ByBlock")
			{Color="\n62\n7"}
	else if(polyline.Color=="")
			{Color=""}
	else{
		Color="\n62\n"+polyline.Color;
	}
	if(polyline.Color24=="")
	{Color24=""}
	else{
		Color24="\n420\n"+polyline.Color24;
	}
//------------------------------
	if(polyline.Kalinlik=="ByLayer")
	{Kalinlik=""}
	else if(polyline.Kalinlik=="ByBlock")
			{Kalinlik="\n370\n-2"}
	else{
		Kalinlik="\n370\n"+polyline.Kalinlik;
	}			 
//------------------------------
	if(polyline.LineType=="ByLayer")
	{type=""}
	else if(polyline.LineType=="ByBlock")
			{type="\n6\nByBlock"}
	else{
		type="\n6\n"+polyline.LineType;
	}			 
//------------------------------"+polyline.layer+type+Color+Kalinlik+"
	
	
	
	DXFVARLIK +="\nLWPOLYLINE\n5\n"+asd.toString(16).toUpperCase()+"\n330\n70\n100\nAcDbEntity\n 8\n"+polyline.layer+type+Color+Color24+Kalinlik+"\n100\nAcDbPolyline\n 90\n  "+polyline.NoktaSay+"\n 70\n  "+polyline.PolyLineFlag+"\n43\n0.0";
	
	
	for(var a=0;a<=NoktaSay-2;a=a+2){
		DXFVARLIK +="\n 10\n"+polyline.Noktalar[a]+"\n 20\n"+polyline.Noktalar[a+1];
		
	}
	DXFVARLIK +="\n0";	
	
	var son2=DXFVARLIK.slice(DXFVARLIK.length-2,DXFVARLIK.length-1);
		  
			
			asd=asd+0x1	
}


function NormalSeksiyonerliGiris(){
  var TRFOGIletken="PrEtiket";
  var SeksiyonerGiris=" GirisIletken";
  var SeksiyonerEtiket= "Etiket";
  var SeksiyonerText="SEKSİYONER";
  var SeksiyonerInis= "InisIletken";
  var SeksiyonerCikis= "Etiket";
  var Hat="Proje.direk.HatIletkeni";
    
  return [["daire","blue",1,false, 530, 1010, 2],["daire","blue",1,false, 542, 1010, 3],["PolyLine","blue",1,false,true, [ 504,277,510,277,510,114,504,114]],["PolyLine","blue",1,false,true, [ 510,277,514,277,514,271,510,271]],["PolyLine","blue",1,false,true, [ 510,120,514,120,514,114,510,114]],["PolyLine","blue",1,false,true, [ 510,199,514,199,514,193,510,193]],["PolyLine","blue",1,false,false, [ 521,277,521,272,518,269,518,268,517,268,517,280,518,280,518,280,521,277]],["PolyLine","blue",1,false,false, [ 525,277,525,272,522,269,522,268,521,268,521,280,522,280,522,280,525,277]],["PolyLine","blue",1,false,false, [ 530,277,530,272,526,269,526,268,525,268,525,280,526,280,526,280,530,277]],["PolyLine","blue",1,false,false, [ 534,277,534,272,530,269,530,268,530,268,530,280,530,280,530,280,534,277]],["PolyLine","blue",1,false,false, [ 538,277,538,272,534,269,534,268,534,268,534,280,534,280,534,280,538,277]],["PolyLine","blue",1,false,false, [ 542,277,542,272,539,269,539,268,538,268,538,280,539,280,539,280,542,277]],["PolyLine","blue",1,false,false, [ 547,277,547,272,543,269,543,268,542,268,542,280,543,280,543,280,547,277]],["PolyLine","blue",1,false,false, [ 514,277,517,277,517,272,514,272]],["PolyLine","blue",1,false,true, [ 547,277,549,277,549,272,547,272]],["PolyLine","blue",1,false,false, [ 521,198,521,193,518,190,518,190,517,190,517,202,518,202,518,201,521,198]],["PolyLine","blue",1,false,false, [ 525,198,525,193,522,190,522,190,521,190,521,202,522,202,522,201,525,198]],["PolyLine","blue",1,false,false, [ 530,198,530,193,526,190,526,190,525,190,525,202,526,202,526,201,530,198]],["PolyLine","blue",1,false,false, [ 534,198,534,193,530,190,530,190,530,190,530,202,530,202,530,201,534,198]],["PolyLine","blue",1,false,false, [ 538,198,538,193,534,190,534,190,534,190,534,202,534,202,534,201,538,198]],["PolyLine","blue",1,false,false, [ 542,198,542,193,539,190,539,190,538,190,538,202,539,202,539,201,542,198]],["PolyLine","blue",1,false,false, [ 547,198,547,193,543,190,543,190,542,190,542,202,543,202,543,201,547,198]],["PolyLine","blue",1,false,false, [ 514,198,517,198,517,193,514,193]],["PolyLine","blue",1,false,true, [ 547,198,549,198,549,193,547,193]],["PolyLine","blue",1,false,false, [ 521,119,521,114,518,111,518,111,517,111,517,123,518,123,518,122,521,119]],["PolyLine","blue",1,false,false, [ 525,119,525,114,522,111,522,111,521,111,521,123,522,123,522,122,525,119]],["PolyLine","blue",1,false,false, [ 530,119,530,114,526,111,526,111,525,111,525,123,526,123,526,122,530,119]],["PolyLine","blue",1,false,false, [ 534,119,534,114,530,111,530,111,530,111,530,123,530,123,530,122,534,119]],["PolyLine","blue",1,false,false, [ 538,119,538,114,534,111,534,111,534,111,534,123,534,123,534,122,538,119]],["PolyLine","blue",1,false,false, [ 542,119,542,114,539,111,539,111,538,111,538,123,539,123,539,122,542,119]],["PolyLine","blue",1,false,false, [ 547,119,547,114,543,111,543,111,542,111,542,123,543,123,543,122,547,119]],["PolyLine","blue",1,false,true, [ 514,119,517,119,517,115,514,115]],["PolyLine","blue",1,false,true, [ 547,119,549,119,549,114,547,114]],["PolyLine","blue",1,false,true, [ 509,158,513,159,514,155,510,154]],["PolyLine","blue",1,false,false, [ 520,159,520,157,517,154,517,153,517,153,515,162,515,162,515,161,520,159]],["PolyLine","blue",1,false,false, [ 524,161,524,158,521,155,522,154,521,154,519,163,519,163,519,162,524,161]],["PolyLine","blue",1,false,false, [ 528,162,528,160,526,156,526,155,525,155,523,164,523,164,523,163,528,162]],["PolyLine","blue",1,false,false, [ 532,163,532,161,530,157,530,156,529,156,527,165,527,165,527,165,532,163]],["PolyLine","blue",1,false,false, [ 536,164,537,162,534,158,534,158,533,157,531,166,531,166,532,166,536,164]],["PolyLine","blue",1,false,false, [ 540,165,541,163,538,159,538,159,537,158,535,167,536,167,536,167,540,165]],["PolyLine","blue",1,false,false, [ 544,166,545,164,542,160,542,160,541,160,539,168,540,168,540,168,544,166]],["PolyLine","blue",1,false,true, [ 513,157,516,158,516,157,514,156]],["PolyLine","blue",1,false,true, [ 544,166,546,167,547,165,545,164]],["PolyLine","blue",1,false,true, [ 547,164,546,167,547,168,548,164]],["PolyLine","blue",1,false,true, [ 548,167,550,167,550,166,548,165]],["PolyLine","blue",1,false,true, [ 549,196,553,196,553,119,549,119]],["PolyLine","blue",1,false,true, [ 549,275,557,275,557,274,549,274]],["PolyLine","blue",1,false,true, [ 549,199,557,199,557,198,549,198]],["PolyLine","blue",1,false,true, [ 551,274,556,274,556,199,551,199]],["PolyLine","blue",1,false,false, [ 553,275,569,275,577,277,582,281,586,287,588,293,590,306,590,317]],["PolyLine","blue",1,false,true, [ 519,1015,525,1015,525,1005,519,1005]],["PolyLine","blue",1,false,true, [ 522,1011,542,1011,542,1009,522,1009]],["PolyLine","blue",1,false,false, [ 522,1015,511,1017,502,1024,498,1034,496,1049,502,1077,503,1107,507,1150,507,1170,508,1189,511,1195,516,1197]],["PolyLine","blue",1,false,false, [ 482,895,520,871,665,871]],["PolyLine","blue",1,false,false, [ 507,277,505,281,501,286,495,291,482,301,479,306,478,311,476,331,477,360,486,674,482,895,485,1019,486,1100,491,1154,495,1180,497,1185,500,1190,502,1193,508,1197,512,1198,515,1198]],["PolyLine","blue",1,false,false, [ 470,63,477,63,493,63,504,65,518,70,526,74,533,82,539,90,543,96,547,105,548,110,549,114,549,117]],["Text","blue",1,532,58,17,SeksiyonerGiris,"Calibri",0],["Text","blue",1,600,115,15,SeksiyonerEtiket,"Calibri",0],["Text","blue",1,600,135,15,SeksiyonerText,"Calibri",0],["Text","blue",1,520,856,15,SeksiyonerInis,"Calibri",0],["Text","blue",1,520,981,15,"Ayırırıcı Kolu","Calibri",0],["Text","blue",1,597,294,15,TRFOGIletken,"Calibri",0]]
  }
 function Pano_Olcu_Dag(){
	var Isletme=Proje.Pano.IsletmeTopraklama;
	return [["daire","blue",1,false, 674, 1131, 1],["PolyLine","blue",1,false,true, [ 598,1232,698,1232,698,1192,598,1192]],["PolyLine","blue",1,false,true, [ 638,1111,658,1111,658,1110,638,1110]],["PolyLine","blue",1,false,true, [ 638,1109,658,1109,658,1108,638,1108]],["PolyLine","blue",1,false,true, [ 638,1107,658,1107,658,1106,638,1106]],["PolyLine","blue",1,false,true, [ 638,1103,658,1103,658,1102,638,1102]],["PolyLine","blue",1,false,true, [ 638,1105,658,1105,658,1104,638,1104]],["PolyLine","blue",1,false,true, [ 638,1101,658,1101,658,1100,638,1100]],["PolyLine","blue",1,false,true, [ 673,1136,675,1136,675,1126,673,1126]],["PolyLine","blue",1,false,true, [ 617,1192,679,1192,679,1070,617,1070]],["PolyLine","blue",1,false,true, [ 617,1111,602,1111,602,1110,617,1090]],["PolyLine","blue",1,false,true, [ 615,1070,681,1070,681,1045,615,1045]],["PolyLine","blue",1,false,true, [ 790,1451,795,1439,795,1273,790,1273]],["PolyLine","blue",1,false,false, [ 664,1190,665,1205,669,1213,676,1220,690,1224,724,1231,744,1236,760,1246,769,1256,774,1267,779,1273,786,1276,790,1276]],["PolyLine","blue",1,false,false, [ 517,1199,518,1210,519,1224,520,1228,522,1231,529,1235,551,1242,569,1243,608,1242,620,1237,624,1221,624,1211,619,1198,617,1189]],["PolyLine","blue",1,false,true, [ 618,1191,678,1191,678,1071,618,1071]],["PolyLine","blue",1,false,false, [ 754,1242,763,1220,826,1220]],["PolyLine","blue",1,false,false, [ 503,983,505,1031,507,1093,509,1106,515,1118,521,1124,532,1133,542,1140,558,1143,570,1145,581,1145,594,1142,601,1138,606,1134,609,1128,611,1111]],["Text","blue",1,806,1398,12,"Işletme","Calibri",0],["Text","blue",1,806,1418,12,"Topraklaması","Calibri",0],["Text","blue",1,806,1333,12,"IToprak K1","Calibri",0],["Text","blue",1,806,1353,12,"IToprak K2","Calibri",0],["Text","blue",1,806,1373,12,"IToprak K3","Calibri",0],["Text","blue",1,763,1206,12,Isletme,"Calibri",0],["Text","blue",1,700,1107,15,"A.D.P.","Calibri",0],["Text","blue",1,618,1154,15,"Dağıtım","Calibri",0],["Text","blue",1,617,1075,15,"Ölçü","Calibri",0],]
}
  var Seksiyoner=[["daire","magenta",2,true,-25,0,5],["daire","red",2,true,25,0,5],["PolyLine","green",2,false,false,[-20.43,-2.02,20.43,-20.29]],["PolyLine","green",2,false,false,[0,-11.162,0,-21.162]],["PolyLine","green",2,false,false,[-12,-30,12,-40]],["PolyLine","green",2,false,false,[-12,-35,12,-45]],["PolyLine","green",2,false,false,[-12,-25,12,-35]],["Rect","green",2,false,-7,-50,14,29 ]]
 