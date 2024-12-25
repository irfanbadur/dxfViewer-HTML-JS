// JavaScript Document              Spline 
var denemeCizgisi = "0\nLINE\n5\n86\n330\n70\n100\nAcDbEntity\n8\n0\n100\nAcDbLine\n10\n92.37939345373934\n20\n97.99582304409296\n30\n0.0\n11\n399.4832542929421\n21\n191.5614558647495\n31\n0.0"
var dairedxf = "0\nCIRCLE\n5\n86\n330\n70\n100\nAcDbEntity\n8\n0\n100\nAcDbCircle\n10\n111.8331799906051\n20\n181.8405540692674\n30\n0.0\n40\n64.50947702088282"
var dxfkodu;
var DXFVARLIK = "0";
var asd = 0x0A;
var CizimKonum = "AGPANO";
//sahnekur();
function sahnekur() {
	width = window.innerWidth - 300;
	height = window.innerHeight;
	stage = new Konva.Stage({
		container: 'container',
		width: width,
		height: height,
		draggable: true,
		renderers: ['webgl', 'canvas'],
		 
	});
	stage.container().style.cursor = 'crosshair';
	stage.container().style.backgroundColor = '#666';
	var layer = new Konva.Layer();
	var daire = new Konva.Circle({
		x: 0,
		y: 0,
		radius: 25,
		//dash:dashh,
		stroke: "red",
		strokeWidth: 1,
		draggable: true,
		sides: 5,
		strokeScaleEnabled: false,
		 

	});

	layer.add(daire);



	var Punto = 1, TextRenk, KucukC, Font = "Arial", fontName, italik = false, bold = false, alt_c = false, ust_c = false, Orta_c = false, font_C, font_P, islemSatir, kalanSatir;
	var satırDizin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var renk, string, textH, TextSName, TextAcı, kalanSatır, FPunto = false, Fbold = false, Frenk = false, Fc = false, FL = false, Fl = false, FO = false, Fo = false, Ff = false, Fitalik = false, Falt = false, Fust = false, Forta = false;
	var alt_c = false, orta_c = false, ust_c = false;
	var dizin, kalan;
	var Drenk = 4;

	StatikCizim(cizim2, 0, 0, 1, 1, "blue", 1, 0); //Trafo Direği


	function StatikCizim(CizimNesnesi, XX, YY, Sx, Sy, renk, kalinlik, aci) {
		console.log("Cizim Nesnesi :", CizimNesnesi)
		var NesneGrup = new Konva.Group({
			x: XX,
			y: YY,
			 

		})
		for (var s = 0; s <= CizimNesnesi.length - 1; s++) {
			var kalinlik1 = CizimNesnesi[s][2];
			var NesneAdi = CizimNesnesi[s].Ad;
			switch (NesneAdi) {
				case "Line":
					var renk = "blue"//ColorIndex(CizimNesnesi[s].Color.trim())
					if (CizimNesnesi[s].Color == "0") {
						renk = "red"
					}
					if (CizimNesnesi[s].Color == "") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					if (CizimNesnesi[s].Color == "7") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					var line = new Konva.Line({
						points: [CizimNesnesi[s].x1 * 1, -1 * CizimNesnesi[s].y1, CizimNesnesi[s].x2 * 1, -1 * CizimNesnesi[s].y2],
						stroke:  ColorIndex(parseInt(CizimNesnesi[s].Color)),//CizimNesnesi[s].Color,//CizimNesnesi[s][1],
						strokeWidth: 1,// CizimNesnesi[s].Kalinlik ,//CizimNesnesi[s][2],
						strokeScaleEnabled: false
					})
 					NesneGrup.add(line)
					break;
				case "Polyline":
					var PolyLineFlag = false;
					if (CizimNesnesi[s].PolyLineFlag.trim() == "1") {
						PolyLineFlag = true;
					}
					var renk = "blue";//ColorIndex(CizimNesnesi[s].Color)
					if (CizimNesnesi[s].Color == "0") {
						renk = "red"
					}
					if (CizimNesnesi[s].Color == "") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					if (CizimNesnesi[s].Color == "7") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					for (var a = 0; a <= CizimNesnesi[s].Noktalar.length - 1; a++) {
						CizimNesnesi[s].Noktalar[a] *= 1;
 					}
					/* for (var a = 1; a <= CizimNesnesi[s].Noktalar.length - 1; a = a + 2) {
						CizimNesnesi[s].Noktalar[a] *= -1;
					} */
					renk = "blue"
					var pl = new Konva.Line({
						points: CizimNesnesi[s].Noktalar,
						stroke:  ColorIndex(parseInt(CizimNesnesi[s].Color)),//CizimNesnesi[s].Color,//CizimNesnesi[s][1],
						strokeWidth: 1,// CizimNesnesi[s].Kalinlik ,//CizimNesnesi[s][2],
						closed: PolyLineFlag,
						strokeScaleEnabled: false
					})
					NesneGrup.add(pl)
					break;
				case "Circle":
					var renk = "blue";//ColorIndex(CizimNesnesi[s].Color.trim())
					if (CizimNesnesi[s].Color == "0") {
						renk = "red"
					}
					if (CizimNesnesi[s].Color == "") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					if (CizimNesnesi[s].Color == "7") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					} renk = "blue"
					var crcl = new Konva.Circle({
						x: CizimNesnesi[s].x * 1,
						y: -CizimNesnesi[s].y * 1,
						Radius: CizimNesnesi[s].r * 1,
						stroke:  ColorIndex(parseInt(CizimNesnesi[s].Color)),//CizimNesnesi[s].Color,//CizimNesnesi[s][1],
						strokeWidth: 1,//CizimNesnesi[s].Kalinlik,
						strokeScaleEnabled: false
					})
					NesneGrup.add(crcl)
					break;
				case "Arc":
					var renk = "blue"//ColorIndex(CizimNesnesi[s].Color.trim())
					if (CizimNesnesi[s].Color == "0") {
						renk = "red"
					}
					if (CizimNesnesi[s].Color == "") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					if (CizimNesnesi[s].Color == "7") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					renk = "blue"
					var yay = new Konva.Arc({
						x: 1 * CizimNesnesi[s].x,
						y: -1 * CizimNesnesi[s].y,
						innerRadius: CizimNesnesi[s].r * 1,
						outerRadius: CizimNesnesi[s].r * 1,
						angle: CizimNesnesi[s].EndAngle * 1 - CizimNesnesi[s].StartAngle * 1,
						rotation: 360 - CizimNesnesi[s].EndAngle * 1,
						stroke:  ColorIndex(parseInt(CizimNesnesi[s].Color)),//CizimNesnesi[s].Color,//CizimNesnesi[s][1],
						strokeWidth: 1,//CizimNesnesi[s].Kalinlik,
						strokeScaleEnabled: false
					})
					NesneGrup.add(yay)
					break;
				case "Spline":
					var renk = "blue"//ColorIndex(CizimNesnesi[s].Color.trim())
					if (CizimNesnesi[s].Color == "0") {
						renk = "red"
					}
					if (CizimNesnesi[s].Color == "") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					if (CizimNesnesi[s].Color == "7") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					var Nok = []
					for (var a = 0; a <= CizimNesnesi[s].Noktalar.length - 1; a++) {
						CizimNesnesi[s].Noktalar[a] *= 1;
					}
				 
					console.log("Noktalar",CizimNesnesi[s].Noktalar)
					console.log("Nok",Nok)
					/*
					for (var a = 0; a <= CizimNesnesi[s].Noktalar.length - 1; a = a + 3) {
						Nok.push(CizimNesnesi[s].Noktalar[a]);
						Nok.push(CizimNesnesi[s].Noktalar[a+1]);
					}

					for (var a = 1; a <= Nok.length - 1; a = a + 2) {
						Nok[a] *= -1;
					}
*/
					//	renk= "blue"
					var Spline = new Konva.Line({
						points:CizimNesnesi[s].Noktalar,//Nok,//[-9.9, 34.63, 42.2, 34.63,  42.2, -24.78,  96.28, -24.78,  126.48, -24.78,  45.61, 51.67],// CizimNesnesi[s].Noktalar,
						stroke: renk,//CizimNesnesi[s].Color,
						strokeWidth: 1,// CizimNesnesi[s].Kalinlik,
						lineJoin: 'round',
						lineCap: 'round',
						//tension: 0.5,
						bezier: true,
						strokeScaleEnabled: false
					});
					NesneGrup.add(Spline)

					break;
				case "Text":
					var renk = "blue"//ColorIndex(CizimNesnesi[s].Color.trim())
					if (CizimNesnesi[s].Color == "0") {
						renk = "red"
					}
					if (CizimNesnesi[s].Color == "") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					}
					if (CizimNesnesi[s].Color == "7") {
						renk = "black"//"#"+CizimNesnesi[s].Color24;
					} renk = ColorIndex(parseInt(CizimNesnesi[s].Color))
					var metin = new Konva.Text({
						x: (CizimNesnesi[s].x) * 1,
						y: CizimNesnesi[s].y * 1,
						text: CizimNesnesi[s].TextString,
						fontSize: CizimNesnesi[s].TextH * 1,
						fontFamily: CizimNesnesi[s].TextStyleName,
						fill: renk,//CizimNesnesi[s].Color ,
						//stroke:  ColorIndex(parseInt(CizimNesnesi[s].Color)),//CizimNesnesi[s].Color,//CizimNesnesi[s][1],

					})

					metin.rotate(-CizimNesnesi[s].TextArc * 1)
					NesneGrup.add(metin)
 					break;
				case "Resim":
					var imageObj = new Image();
					imageObj.onload = function () {
						var resim = new Konva.Image({
							x: 16,//CizimNesnesi[s][3] ,
							y: 16,//CizimNesnesi[s][4] , 
							image: imageObj,
							width: 932,
							height: 300,
						});
						//layer.add(resim);
						NesneGrup.add(resim);

					};
					imageObj.src = 'NefBaslik.jpg';
					break;
			}


		}

		//NesneGrup.scale({x:Sx,y:Sy});
		//NesneGrup.rotate(aci);
		layer.add(NesneGrup);
		layer.draw();
		nesnesonu();
	}
	function nesnesonu() {
		stage.add(layer);
		layer.draw();

		var scaleBy = 0.95;
		stage.on('wheel', e => {
			e.evt.preventDefault();
			var oldScale = stage.scaleX();

			var mousePointTo = {
				x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
				y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
			};

			var newScale =
				e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
			stage.scale({ x: newScale, y: newScale });

			var newPos = {
				x:
					-(mousePointTo.x - stage.getPointerPosition().x / newScale) *
					newScale,
				y:
					-(mousePointTo.y - stage.getPointerPosition().y / newScale) *
					newScale
			};
			stage.position(newPos);
			stage.batchDraw();
		});
	}

}