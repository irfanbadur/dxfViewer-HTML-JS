 	lType=new Array;
	var l_typeName=[];
 	Varliklar=[];
	LTYPES=[];
	var dizin=[];
	ENTITIES=[];
	TABLES=[];
	KATMANLAR=[];
	Layers=[];
	LTypes=[];
	CIZGILER=[];
	LINES=[];
	CIRCLES=[];
	TEXT=[];

	ARCS=[];
	POLYLINES=[];
	SPLINES=[];
	DASHARRAY=[];
	renkFlag=false,LineTypeFlag=false;
	DefaultCizgiK=40;
	var cizim2=[];
	var LineDXF=[]	;
	var l_typeName=[];
	var TextString,TextStyleName,TextArc,AttachmentPoint,RefRectH,RefRectW;
	var ais1,renk,kalinlik,Stroke_DashArray,NesneNo,StartArc,EndArc;
	var LayerName,LayerOnOff,layerLock,layerFreeze,LineType,LayerlineTypeName,Color,LayerColor;
	var LineScale=1,LineWeight=40,Thickness,X,Y,Z,R,TextH;
	var Color24="";
 	document.getElementById("doswewya").addEventListener('change',function(){
	var dosyaoku=new FileReader();
	//var dxfkodu=new Array;
	  	dosyaoku.onload=function(){
		//document.getElementById("veri").Text=this.result;
		dxfkodu=this.result.split("\n");			
		dizi="" ;
		for (var a=0;a<=dxfkodu.length-1;a++){
			dxfkodu[a]=dxfkodu[a].slice(0,dxfkodu[a].length-1);
		}			
		LineType="ByLayer";			
		// TABLES dizisini yazma
		no=	dxfkodu.indexOf("TABLES");		 
		while(dxfkodu[no]!="ENDSEC"){			
		TABLES.push(dxfkodu[no]);			
		no++;				
		}
		TABLES.push(dxfkodu[no]);	
			//TABLES DİZİSİ İÇİNDE LAYER DİZİSİ Oluşturuluyor
		k=TABLES.indexOf("LAYER");
		m=k-3;
		while(TABLES[m]!="ENDTAB"){		
		m++;
		Layers.push(TABLES[m]);
 		}	
		//TABLES DİZİSİ İÇİNDE LTYPE DİZİSİ Oluşturuluyor
		k=TABLES.indexOf("LTYPE");
		m=k-3;
		while(TABLES[m]!="ENDTAB"){		
		m++;
		LTypes.push(TABLES[m]);
		}
 		// TABLES dizisini yazma	
 		// ENTITIES dizisini yazma
		no=	dxfkodu.indexOf("ENTITIES");		 
		while(dxfkodu[no]!="ENDSEC"){		
		ENTITIES.push(dxfkodu[no]);		
		no++;				
		}
		// ENTITIES dizisini yazma			
		LTypeOku(LTypes);
		LayerOku(Layers);	
		varlikOku(ENTITIES);
 	  }	 
	  	dosyaoku.readAsText(this.files[0]);		
  })
 
function LTypeOku(Linetip){
 	//for (var a=0 ;a<=tablodizi.length-1;a++){
	a=0;
	while ( Linetip[a]!="ENDTAB"){	
		l_tipi=[];
		if (Linetip[a]=="AcDbLinetypeTableRecord"){			
		//	if (Linetip[a]=="2"){
			l_tipi.push(Linetip[a+2])	;//Ltype Name yazıldı
			l_typeName.push(Linetip[a+2]);
		//	}
			v=0;
			while ( Linetip[a]!=73){
			a++;	
			}
			if (Linetip[a]==73){			
			elemansay=parseInt(Linetip[a+1]);
			l_tipi.push(elemansay)	;//Ltype elemansayısı yazıldı	
						if (elemansay!=0){						 
						for (var x=a+4;x<=a+elemansay*4;x+=4){
							l_tipi.push(parseInt(Linetip[x+1])*LineScale);				//l_tipi.push(parseInt(Linetip[x+5])*LineScale);			
						}
				}				
			}		
			a++;		
		LTYPES.push(l_tipi);			
	}		
	a++;		
	}
}
function LayerOku(tablodizi){
	
	//for (var a=0 ;a<=tablodizi.length-1;a++){
	a=0;
	while ( tablodizi[a]!="ENDTAB"){	
		Katman=[];		
		if (tablodizi[a]=="AcDbLayerTableRecord"){			
			b=a;			
			if (tablodizi[b+1]==2){		
			Katman.push(tablodizi[b+2])	;//Layer Name yazıldı		
			}			
			while(tablodizi[b]!="347"){
			if (tablodizi[b]==62){
				if (tablodizi[b+1]<0){
			Katman.push("off")		;					
			Katman.push(tablodizi[b+1]*-1)	;// Color
			LayerColor=(tablodizi[b+1]*-1);	
				}else{
			Katman.push("on")		;					
			Katman.push(tablodizi[b+1]*1)	;// Color
			LayerColor=(tablodizi[b+1]);
				}				
			}	
			if (tablodizi[b]==70){	
				vv=tablodizi[b+1]*1;
				if(vv==4){
				Katman.push("NoneFreeze");
				Katman.push("Locked");				
				}else if(vv==1||vv==2){
				Katman.push("Freeze");
				Katman.push("NoneLock");	
				}else if(vv==5){
				Katman.push("Freeze");
				Katman.push("Locked");	
				}else if(vv==7){
				Katman.push("Freeze");
				Katman.push("Locked");	
				}else if(vv==0){
				Katman.push("NoneFreeze");
				Katman.push("NoneLock");
				}				
			}
		if (tablodizi[b]==6){				
			Katman.push(tablodizi[b+1])	;// Color
			}
			if (tablodizi[b]==370){
				if(tablodizi[b+1]=="    -3"){
				Katman.push(DefaultCizgiK)	;// Color	
				}else{
				Katman.push(tablodizi[b+1])	;// Color	
				}
			}
			b++;
		}	
		a=b+1;
		KATMANLAR.push(Katman);			
	}		
	a++;	
	}
}
function katmanRenk(katmanadı){
	for (var a=0;a<=KATMANLAR.length-1;a++){
		
		if(KATMANLAR[a][0]==katmanadı){
		
		return KATMANLAR[a][4];
		}		
	}	
}
function varlikOku(varlikdizi){			
	function toHex(d) {
		var hex = Number(d).toString(16);
		hex = "000000".substr(0, 6 - hex.length) + hex;
	   // console.log("Decimal: ",d, "    Hex:",hex)
	   if(hex==="000000"){hex=""}

		return hex;
	}		
for(var a =0 ;a<=varlikdizi.length-1;a++){				
		// TEXT (tek SATIR) OKUNMASI------------------------				
		if (varlikdizi[a]=="TEXT"){		
		b=a+1;					
		while(varlikdizi[b]!="AcDbEntity"){
		b++					
		}
		Text=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		Color24="";
		c=b+1;	
		while(varlikdizi[c]!="AcDbText"){
		if( parseInt(varlikdizi[c])==8) {		//Layer	name				 
			LayerName=varlikdizi[c+1];	

			LineType=AttributeAl(LayerName,"LayerlineTypeName");
			Color=AttributeAl(LayerName,"lineColor");
			LineWeight=AttributeAl(LayerName,"lineWeight");
			LayerOnOff=AttributeAl(LayerName,"LayerOnOff");
			layerFreeze=AttributeAl(LayerName,"layerFreeze");
			layerLock=AttributeAl(LayerName,"layerLock");				


			c++;
		}
		if( parseInt(varlikdizi[c])==6) {				//LineType				 
			LineType=varlikdizi[c+1];

			c++;
		} 
		if( parseInt(varlikdizi[c])==62) {	
			Color= varlikdizi[c+1];				
			renkFlag=true;		 
			c++;
			//LayerName=dxfkodu[c+1];
		}
		if( parseInt(varlikdizi[c])==420) {			//Color
			Color="" ;
			Color24= varlikdizi[c+1];
			renkFlag=true;
			c++;

		}
		if( parseInt(varlikdizi[c])==440) {			//

			c++;
			//LayerName=varlikdizi[c+1];
		}
		if( parseInt(varlikdizi[c])==48) {				//Line Scale

			LineScale=varlikdizi[c+1];
			c++;
		}
		if( parseInt(varlikdizi[c])==370) {			//Line Weight

			LineWeight=varlikdizi[c+1];

		}

		c++	;
		e=c+2;
		}


			if(renkFlag==false){
			Color=katmanRenk(LayerName);	
			if(typeof(Color)===String){Color=ColorIndex(Color.trim())}
			}
			if(LineTypeFlag==false){
			LineType="ByLayer"	;
			}

			TextArc=0;
		while(varlikdizi[e]!="AcDbText"){			
		//	if( parseInt(varlikdizi[e])==10) {			//X				 
		//	X=Math.round(parseFloat(varlikdizi[e+1]));

		//}	
			if( parseInt(varlikdizi[e])==20) {			//Y	
			X=(1*varlikdizi[e-1]).toFixed(2);
			Y=(-1*varlikdizi[e+1]).toFixed(2);
		}	
			if( parseInt(varlikdizi[e])==30) {			//Z 
			Z=varlikdizi[e+1];
		}					
			if( parseInt(varlikdizi[e])==50) {			//Z 
			TextArc=(1*varlikdizi[e+1]).toFixed(2);
		}	
			if( parseInt(varlikdizi[e])==40) {			//Text Height 
			TextH=(1*varlikdizi[e+1]).toFixed(2);
		}   
			if( parseInt(varlikdizi[e])==1) {			//Text String			 
			TextString=varlikdizi[e+1];

		}	if( parseInt(varlikdizi[e])==7) {			//Text Style Name				 
			TextStyleName=varlikdizi[e+1];
		}


			e++;
		}

		Text[6]=Stroke_DashArray  ;	
		Text[7]=Color;			
		Text[8]=X;	
		Text[9]=Y;			
		Text[11]=TextH;
		Text[12]=TextString;
		Text[13]=TextStyleName;
		Text[14]=TextArc;

		TEXT.push(Text);
		document.getElementById("ais").textContent +=',{Ad:"Text", layer:"'+LayerName+'", Color:"'+Color +'", Color24:"'+toHex(Color24.trim())+'", LineScale:'+LineScale+', LineType:"'+LineType+'", Kalinlik:'+LineWeight+', x:X+Scl*('+X+'), y:Y+Scl*('+(Y-TextH)+'),TextH:Scl*'+TextH+',TextString:"'+TextString+'",TextStyleName:"'+TextStyleName+'",TextArc:'+TextArc+' }';	

		cizim2.push({Ad:"Text", layer:LayerName, Color:Color , Color24:Color24.trim(), LineScale:LineScale, LineType:LineType, Kalinlik:LineWeight, x:X, y:(Y-TextH),TextH:TextH,TextString:TextString,TextStyleName:TextStyleName,TextArc:TextArc });

		}	
		// SPLINE OKUNMASI

		if (varlikdizi[a]=="SPLINE"){		
		b=a+1;	

		while(varlikdizi[b]!="AcDbEntity"){
		b++	
		}
		SPLine=[0,0,0,0,0,0,0,0,0];
		Color24="";
		c=b+1;	
		while(varlikdizi[c]!="AcDbSpline"){
		if( parseInt(varlikdizi[c])==8) {			//Layer	name				 
			LayerName=varlikdizi[c+1];				
			LineType=AttributeAl(LayerName,"LayerlineTypeName");
			Color=AttributeAl(LayerName,"lineColor");
			LineWeight=AttributeAl(LayerName,"lineWeight");
			LayerOnOff=AttributeAl(LayerName,"LayerOnOff");
			layerFreeze=AttributeAl(LayerName,"layerFreeze");
			layerLock=AttributeAl(LayerName,"layerLock");				

			c++;
		}
		if( parseInt(varlikdizi[c])==6) {				//LineType				 
			LineType=varlikdizi[c+1];

			c++;
		} 
		if( parseInt(varlikdizi[c])==62) {	
			Color=  varlikdizi[c+1];				
			renkFlag=true;
			c++;
			//LayerName=dxfkodu[c+1];
		}
		if( parseInt(varlikdizi[c])==420) {			//Color
			Color="" ;
			Color24= varlikdizi[c+1];
			renkFlag=true;
			c++;

		}
		if( parseInt(varlikdizi[c])==440) {				//				 
			c++;
			//LayerName=varlikdizi[c+1];
		}
		if( parseInt(varlikdizi[c])==48) {				//Line Scale			 
			LineScale=varlikdizi[c+1];
			c++;
		}
		if( parseInt(varlikdizi[c])==370) {				//Line Weight				 
			LineWeight=varlikdizi[c+1];				
		}				
		c++	
		e=c+1;	
		NesneNo= c;   // 
		}	
			if(renkFlag==false){
			Color=katmanRenk(LayerName);	
			if(typeof(Color)===String){Color=ColorIndex(Color.trim())}
			}
			if(LineTypeFlag==false){
			LineType="ByLayer"	;
			}
			var NoktaSayisi;
			while(varlikdizi[e]!=70 ){					
			e++;	 
		}
			NoktaSayisi=Math.round(parseInt(varlikdizi[e+1]));
			var Knots=[];

			while(varlikdizi[e]!=40 ){
			if( parseInt(varlikdizi[e])==70) 
			{	SpFlag=varlikdizi[e+1];			}	
			if( parseInt(varlikdizi[e])==71) 
			{	SpDegree=varlikdizi[e+1];		}	
			if( parseInt(varlikdizi[e])==72) 
			{	NumberOfKnots=varlikdizi[e+1];	}	
			if( parseInt(varlikdizi[e])==73) 
			{	NumberOfCPoints=varlikdizi[e+1];	}	
			if( parseInt(varlikdizi[e])==74) 
			{	NumberOfFitPoints=varlikdizi[e+1];	}	
			if( parseInt(varlikdizi[e])==42) 
			{	Tlrns42=varlikdizi[e+1];	}	
			if( parseInt(varlikdizi[e])==43) 
			{	Tlrns43=varlikdizi[e+1];	}	
			if( parseInt(varlikdizi[e])==44) 
			{	Tlrns44=varlikdizi[e+1];	}	
			e++;								
		}	

			if(Math.round(parseInt(varlikdizi[e+1]))==0){
				SPLine[0]=false;
			}else if(Math.round(parseInt(varlikdizi[e+1]))==1){
				SPLine[0]=true;
			}
			//SPLine[0]=Math.round(parseInt(varlikdizi[e+1]))  ;

			var Noktalar=[];
			var NoktalarSPL=[];
			var FitPoints=[];
			var SpFlag,SpDegree,NumberOfKnots,NumberOfCPoints,NumberOfFitPoints;
			var Tlrns42;
			var Tlrns43;
			var Tlrns44=null;

			while(varlikdizi[e]!=10 ){

			if( parseInt(varlikdizi[e])==40) {						  
				Knots.push(varlikdizi[e+1])		; 
			}
				e++;
			}				
			while(varlikdizi[e]!=10 ){e++;

			}

			while(varlikdizi[e]!=0 ){

			if( parseInt(varlikdizi[e])==10) {		    //X				 
			//PointX.push(Math.round(parseFloat(varlikdizi[e+1])));
			Noktalar.push("X+Scl*("+(1*varlikdizi[e+1]).toFixed(2)+")")		; 
			NoktalarSPL.push((1*varlikdizi[e+1]).toFixed(2))		; 

			SPLine.push(varlikdizi[e+1])		;
		}	
			if( parseInt(varlikdizi[e+2])==20) {			//Y			 
			SPLine.push(varlikdizi[e+3]);		;
			Noktalar.push("Y+Scl*("+(-1*varlikdizi[e+3]).toFixed(2)+")");		;
			NoktalarSPL.push((-1*varlikdizi[e+3]).toFixed(2));		;

		}	
/*
			if( parseInt(varlikdizi[e+4])==30) {			//Z			 
			Noktalar.push((1*varlikdizi[e+5]).toFixed(2));		;
			NoktalarSPL.push((1*varlikdizi[e+5]).toFixed(2));		;
			 
		}	
		
*/
			if( parseInt(varlikdizi[e])==11) {		    //X				 
			FitPoints.push("X+Scl*("+(1*varlikdizi[e+1]).toFixed(2)+")")		; 
		}	
		 
			if( parseInt(varlikdizi[e+2])==21) {			//Y			 
			FitPoints.push("Y+Scl*("+(1*varlikdizi[e+3]).toFixed(2)+")");		;

		}	

			if( parseInt(varlikdizi[e+4])==31) {			//Y			 
			FitPoints.push((1*varlikdizi[e+5]).toFixed(2));		;
		}	
			//e=e+eb+4;	
				e=e+3;
		}
			Stroke_DashArray=StrokeDashArrayHazirla(LineType );
			SPLine[5]=" SPLINE"  ;		
			SPLine[6]=Stroke_DashArray  ;	
			SPLine[7]=Color;			
			SPLine[8]=NoktaSayisi;				
			SPLINES.push(SPLine);
			console.log("SPLİNES    :",Color,Noktalar)

			document.getElementById("ais").textContent +=',{Ad:"Spline", layer:"'+LayerName+'", Color:"'+Color +'", Color24:"'+toHex(Color24.trim())+'", LineScale:'+LineScale+', LineType:"'+LineType+'", Kalinlik:'+LineWeight+',SpFlag:"'+SpFlag+'",SpDegree:'+SpDegree+',NumberOfKnots:'+NumberOfKnots+',Tlrns42:"'+Tlrns42+'",Tlrns43:"'+Tlrns43+'",Tlrns44:"'+Tlrns44+'",NumberOfCPoints:'+NumberOfCPoints+',NumberOfFitPoints:'+NumberOfFitPoints+',Knots:['+Knots+'], Noktalar:['+Noktalar+'], FitNoktalar:['+FitPoints+']}';				 
			cizim2.push({Ad:"Spline", layer:LayerName, Color:Color , Color24:Color24.trim(), LineScale:LineScale, LineType:LineType, Kalinlik:LineWeight,SpFlag:SpFlag,SpDegree:SpDegree,NumberOfKnots:NumberOfKnots,NumberOfCPoints:NumberOfCPoints,NumberOfFitPoints:NumberOfFitPoints,Knots:[Knots], Noktalar:NoktalarSPL});
		}	

		// ARC OKUNMASI				
		if (varlikdizi[a]=="ARC"){		
		b=a+1;					
		while(varlikdizi[b]!="AcDbEntity"){
		b++					
		}
		Arc=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		Color24="";
		c=b+1;	
		while(varlikdizi[c]!="AcDbCircle"){
		if( parseInt(varlikdizi[c])==8) {			//Layer	name				 
			LayerName=varlikdizi[c+1];				
			LineType=AttributeAl(LayerName,"LayerlineTypeName");
			Color=AttributeAl(LayerName,"lineColor");
			LineWeight=AttributeAl(LayerName,"lineWeight");
			LayerOnOff=AttributeAl(LayerName,"LayerOnOff");
			layerFreeze=AttributeAl(LayerName,"layerFreeze");
			layerLock=AttributeAl(LayerName,"layerLock");				

			c++;
		}
		if( parseInt(varlikdizi[c])==6) {				//LineType				 
			LineType=varlikdizi[c+1];

			c++;
		} 
		if( parseInt(varlikdizi[c])==62) {	
			Color= varlikdizi[c+1];				
			renkFlag=true;		 
			c++;
			//LayerName=dxfkodu[c+1];
		}
		if( parseInt(varlikdizi[c])==420) {			//Color
			Color="" ;
			Color24= varlikdizi[c+1];
			renkFlag=true;
			c++;

		}
		if( parseInt(varlikdizi[c])==440) {			//

			c++;
			//LayerName=varlikdizi[c+1];
		}
		if( parseInt(varlikdizi[c])==48) {				//Line Scale

			LineScale=varlikdizi[c+1];
			c++;
		}
		if( parseInt(varlikdizi[c])==370) {			//Line Weight

			LineWeight=varlikdizi[c+1];

		}				
		c++	
		e=c+1;	
		NesneNo= c;   // Oluşturulan daire nesnesine bir numara veriliyor
		}


			if(renkFlag==false){
			Color=katmanRenk(LayerName);	
			if(typeof(Color)===String){Color=ColorIndex(Color.trim())}
			}
			if(LineTypeFlag==false){
			LineType="ByLayer"	;
			}	
		while(varlikdizi[e-1]!=51){
			if( parseInt(varlikdizi[e])==39) {			//LThickness

			Thickness=Math.round(parseFloat(varlikdizi[e+1]));
		}	
		if( varlikdizi[e]==" 10") {			//X
			X=(1*varlikdizi[e+1]).toFixed(2);
		}	
		if( parseInt(varlikdizi[e])==20) {			//Y
			Y=(1*varlikdizi[e+1]).toFixed(2);
		}	
		if( parseInt(varlikdizi[e])==30) {			//Z
			Z=varlikdizi[e+1];
		}	
			
		if( parseInt(varlikdizi[e])==40) {			//R	 
			R=(1*varlikdizi[e+1]).toFixed(2);
		}   
		if( parseInt(varlikdizi[e])==50) {			//StartArc

			StartArc=(1*varlikdizi[e+1]).toFixed(2);
		}	
		if( parseInt(varlikdizi[e])==51) {			//StartArc

			EndArc=(1*varlikdizi[e+1]).toFixed(2);
		}
			e++
		}

		Arc[6]=Stroke_DashArray  ;	
		Arc[7]=Color;			
		Arc[8]=X;
		Arc[9]=-Y;			
		Arc[11]=R;
		Arc[12]=StartArc;
		Arc[13]=EndArc;

		ARCS.push(Arc);
		document.getElementById("ais").textContent +=',{Ad:"Arc", layer:"'+LayerName+'", Color:"'+Color +'", Color24:"'+toHex(Color24.trim())+'", LineScale:'+LineScale+', LineType:"'+LineType+'", Kalinlik:'+LineWeight+',x:X+Scl*('+X+'),y:Y+Scl*('+(-Y)+'),r:Scl*'+R+',StartAngle:'+StartArc+',EndAngle:'+EndArc+'}';
		cizim2.push({Ad:"Arc", layer:LayerName, Color:Color , Color24:Color24.trim(), LineScale:LineScale, LineType:LineType, Kalinlik:LineWeight,x:X,y:Y,r:R,StartAngle:StartArc,EndAngle:EndArc});		

		}
		// POLYLINE OKUNMASI

		if (varlikdizi[a]=="LWPOLYLINE"){
		var NoktaSay;
		b=a+1;	
		while(varlikdizi[b]!="AcDbEntity"){
		b++					
		}
		PolyLine=[0,0,0,0,0,0,0,0,0];
		Color24="";

		c=b+1;	
		while(varlikdizi[c]!="AcDbPolyline"){
		if( parseInt(varlikdizi[c])==8) {			//Layer	name			 
			LayerName=varlikdizi[c+1];				
			LineType=AttributeAl(LayerName,"LayerlineTypeName");
			Color=AttributeAl(LayerName,"lineColor");
			LineWeight=AttributeAl(LayerName,"lineWeight");
			LayerOnOff=AttributeAl(LayerName,"LayerOnOff");
			layerFreeze=AttributeAl(LayerName,"layerFreeze");
			layerLock=AttributeAl(LayerName,"layerLock");				

			c++;
		}
		if( parseInt(varlikdizi[c])==6) {				//LineType			 
			LineType=varlikdizi[c+1];				
			c++;
		} 
		if( parseInt(varlikdizi[c])==62) {	
			Color= varlikdizi[c+1];				
			renkFlag=true;
			c++;
			//LayerName=dxfkodu[c+1];
		}
		if( parseInt(varlikdizi[c])==420) {			//Color
			Color="" ;
			Color24= varlikdizi[c+1];
			renkFlag=true;
			c++;

		}
		if( parseInt(varlikdizi[c])==440) {				//				 
			c++;
			//LayerName=varlikdizi[c+1];
		}
		if( parseInt(varlikdizi[c])==48) {				//Line Scale		 
			LineScale=varlikdizi[c+1];
			c++;
		}
		if( parseInt(varlikdizi[c])==370) {				//Line Weight				 
			LineWeight=varlikdizi[c+1];				
		}						
		if( parseInt(varlikdizi[c])==90) {				//nokta sayısı				 
			NoktaSay=varlikdizi[c+1];				
		}				
		c++	
		e=c+1;	
		NesneNo= c;   // 
		}	

			if(renkFlag==false){
			Color=katmanRenk(LayerName);	
			if(typeof(Color)===String){Color=ColorIndex(Color.trim())}
			}
			if(LineTypeFlag==false){
			LineType="ByLayer"	;
			}
			var NoktaSayisi;
			while(varlikdizi[e]!=90 ){
			e++;	 

		}
			NoktaSayisi=Math.round(parseInt(varlikdizi[e+1]));
			var PolyLineFlag;
			while(varlikdizi[e]!=70 ){

			e++;								
		}	
			if(varlikdizi[e]==70){
				PolyLineFlag=varlikdizi[e+1];
			}	
			if(Math.round(parseInt(varlikdizi[e+1]))==0){
				PolyLine[0]=false;
			}else if(Math.round(parseInt(varlikdizi[e+1]))==1){
				PolyLine[0]=true;
			}
 

			while(varlikdizi[e]!=10 ){e++;}
			var eb;
			if(varlikdizi[e+4]==10){
				eb=0;
			}else{eb=2;}
			var Noktalar=[]
			var NoktalarPL=[]
			while(varlikdizi[e]!=0 ){
				
			if( parseInt(varlikdizi[e])==10) {		    //X					
 			PolyLine.push(varlikdizi[e+1])		;
			 Noktalar.push("X+Scl*("+(1*varlikdizi[e+1]).toFixed(2)+")")		;
			 NoktalarPL.push((1*varlikdizi[e+1]).toFixed(2))		;
		}	
			if( parseInt(varlikdizi[e+2])==20) {			//Y			 
 			PolyLine.push(varlikdizi[e+3]);		;
			Noktalar.push("Y+Scl*("+(-1*varlikdizi[e+3]).toFixed(2)+") ");		;
			NoktalarPL.push((-1*varlikdizi[e+3]).toFixed(2))		;

		}

			e=e+eb+4;								
		}
			Stroke_DashArray=StrokeDashArrayHazirla(LineType );
			PolyLine[5]=" POLYLINE"  ;		
			PolyLine[6]=Stroke_DashArray  ;	
			PolyLine[7]=Color;			
			PolyLine[8]=NoktaSayisi;				
			POLYLINES.push(PolyLine);
			//console.log("PLY LİNES    :",Noktalar)
			console.log("PolyLine Color :",Color)
			document.getElementById("ais").textContent +=',{Ad:"Polyline", layer:"'+LayerName+'", Color:"'+Color+'", Color24:"'+toHex(Color24.trim())+'", LineScale:'+LineScale+', LineType:"'+LineType+'", Kalinlik:'+LineWeight+',NoktaSay:'+NoktaSayisi+',PolyLineFlag:"'+PolyLineFlag+'", Noktalar:['+Noktalar+']}';

			cizim2.push({Ad:"Polyline", layer:LayerName, Color:Color, Color24:Color24.trim(), LineScale:LineScale, LineType:LineType, Kalinlik:LineWeight,PolyLineFlag:PolyLineFlag, Noktalar:NoktalarPL});
		}	

		// CIRCLE OKUNMASI				
		if (varlikdizi[a]=="CIRCLE"){		
		b=a+1;					
		while(varlikdizi[b]!="AcDbEntity"){
		b++					
		}
		Circle=[0,0,0,0,0,0,0,0,0,0,0,0,0];
		Color24="";
		c=b+1;	
		while(varlikdizi[c]!="AcDbCircle"){
		if( parseInt(varlikdizi[c])==8) {			//Layer	name				 
			LayerName=varlikdizi[c+1];				
			LineType=AttributeAl(LayerName,"LayerlineTypeName");
			Color=AttributeAl(LayerName,"lineColor");
			LineWeight=AttributeAl(LayerName,"lineWeight");
			LayerOnOff=AttributeAl(LayerName,"LayerOnOff");
			layerFreeze=AttributeAl(LayerName,"layerFreeze");
			layerLock=AttributeAl(LayerName,"layerLock");				

			c++;
		}
		if( parseInt(varlikdizi[c])==6) {				//LineType				 
			LineType=varlikdizi[c+1];

			c++;
		} 
		if( parseInt(varlikdizi[c])==62) {	
			Color=  varlikdizi[c+1] ;		
			if(typeof(Color)===String){Color=ColorIndex(Color.trim())}		
			renkFlag=true;		 
			c++;
			//LayerName=dxfkodu[c+1];
		}
		if( parseInt(varlikdizi[c])==420) {			//Color
			Color="" ;
			Color24= varlikdizi[c+1];
			renkFlag=true;
			c++;

		}
		if( parseInt(varlikdizi[c])==440) {			//

			c++;
			//LayerName=varlikdizi[c+1];
		}
		if( parseInt(varlikdizi[c])==48) {				//Line Scale

			LineScale=varlikdizi[c+1];
			c++;
		}
		if( parseInt(varlikdizi[c])==370) {			//Line Weight

			LineWeight=varlikdizi[c+1];

		}				
		c++	
		e=c+1;	
		NesneNo= c;   // Oluşturulan daire nesnesine bir numara veriliyor
		}
			if(renkFlag==false){
			Color=katmanRenk(LayerName);	
			}
			if(LineTypeFlag==false){
			LineType="ByLayer"	;
			}	
		while(varlikdizi[e-1]!=40){
			if( parseInt(varlikdizi[e])==39) {			//LThickness

			Thickness=Math.round(parseFloat(varlikdizi[e+1]));
		}	if( varlikdizi[e]==" 10") {			//X

			X=(1*varlikdizi[e+1]).toFixed(2);
			 
		}	
		if( parseInt(varlikdizi[e])==20) {			//Y

			Y=(1*varlikdizi[e+1]).toFixed(2);
		}	if( parseInt(varlikdizi[e])==30) {			//Z

			Z=(1*varlikdizi[e+1]).toFixed(2);
		}	
			if( parseInt(varlikdizi[e])==40) {			//R	 
			R=(1*varlikdizi[e+1]).toFixed(2);
		}
			e++
		}			
		Circle[6]=Stroke_DashArray  ;	
		Circle[7]=Color;			
		Circle[8]=X;
		Circle[9]=Y;			
		Circle[11]=R;			
		CIRCLES.push(Circle);
		document.getElementById("ais").textContent +=',{Ad:"Circle", layer:"'+LayerName+'", Color:"'+Color +'", Color24:"'+toHex(Color24.trim())+'", LineScale:'+LineScale+', LineType:"'+LineType+'", Kalinlik:'+LineWeight+', x:X+Scl*('+X+'), y:Y+Scl*('+(-Y)+'), r:Scl*'+R+'}';
		cizim2.push({Ad:"Circle", layer:LayerName, Color:Color , Color24:Color24.trim(), LineScale:LineScale, LineType:LineType, Kalinlik:LineWeight, x:X, y:Y, r:R});
		}			

		if (varlikdizi[a]=="Continuous"){		
		LineType=varlikdizi[a];	
		}
		//--------------- LINES---------------------------
		if (varlikdizi[a]=="LINE"){	
			renkFlag=false;
			LineTypeFlag=false;
		b=a+1;	
		Line=[0,0,0,0,0,0,0,0,0,0,0,0,0];	
		Color24="";
		while(varlikdizi[b]!="AcDbEntity"){
		b++					
		}
		c=b+1;	
		LineWeight=0;
		while(varlikdizi[c]!="AcDbLine"){
		if( parseInt(varlikdizi[c])==8) {			//Layer	name				 
			LayerName=varlikdizi[c+1];
			c++;
		}

		if( parseInt(varlikdizi[c])==6) {				//LineType				 
			LineTypeFlag=true;
			LineType=varlikdizi[c+1];
			c++;
		} 

		if( parseInt(varlikdizi[c])==62) {				//	
			Color= varlikdizi[c+1];

			renkFlag=true;
			c++;
			//LayerName=varlikdizi[c+1];
		}
		if( parseInt(varlikdizi[c])==420) {			//Color
			Color="" ;
			Color24= varlikdizi[c+1];
			renkFlag=true;
			c++;

		}/* 
		if( parseInt(varlikdizi[c])==440) {			
			c++;
		} */
		if( parseInt(varlikdizi[c])==48) {				//Line Scale
			LineScale=varlikdizi[c+1];
			c++;
		}
		if( parseInt(varlikdizi[c])==370) {			//Line Weight
			LineWeight=varlikdizi[c+1];
		}
			if(renkFlag==false){
			Color=katmanRenk(LayerName) ;	
			if(typeof(Color)===String){Color=ColorIndex(Color.trim())}
			}
			if(LineTypeFlag==false){
			LineType="ByLayer"	;
			}
		c++	
		e=c+1;	
		}


		while (varlikdizi[e - 1] != 31) {
			if (parseInt(varlikdizi[e]) == 39) { // LThickness
			  Thickness = varlikdizi[e + 1];
			}
			if (parseInt(varlikdizi[e]) == 10) { // X1
			  X1 = parseFloat(varlikdizi[e + 1]).toFixed(2);
			}
			if (parseInt(varlikdizi[e]) == 20) { // Y1
			  Y1 = parseFloat(varlikdizi[e + 1]).toFixed(2);
			}
			if (parseInt(varlikdizi[e]) == 30) { // Z1
			  Z1 = parseFloat(varlikdizi[e + 1]).toFixed(2);
			}
			if (parseInt(varlikdizi[e]) == 11) { // X2
			  X2 = parseFloat(varlikdizi[e + 1]).toFixed(2);
			}
			if (parseInt(varlikdizi[e]) == 21) { // Y2
			  Y2 = parseFloat(varlikdizi[e + 1]).toFixed(2);
			}
			if (parseInt(varlikdizi[e]) == 31) { // Z2
			  Z2 = parseFloat(varlikdizi[e + 1]).toFixed(2);
			}	

			e++
		}

		Stroke_DashArray=StrokeDashArrayHazirla(LineType );
		Line[5]=LayerName;
		Line[6]=Stroke_DashArray  ;
		Line[7]=Color;			
		Line[8]=X1;
		Line[9]=Y1;			
		Line[11]=X2;
		Line[12]=Y2;

		LINES.push(Line);
		console.log("Color Line: ",Color,Line)

		LineDXF={Ad:"Line",layer:LayerName,Color:Color ,Color24:Color24.trim(),LineScale:LineScale,LineType:LineType,Kalinlik:LineWeight,x1:X1,y1:Y1,x2:X2,y2:Y2}		
		document.getElementById("ais").textContent +=',{Ad:"Line", layer:"'+LayerName+'", Color:"'+Color+'", Color24:"'+toHex(Color24.trim())+'", LineScale:'+LineScale+', LineType:"'+LineType+'", Kalinlik:'+LineWeight+', x1:X+Scl*('+X1+'), y1:Y+Scl*('+(-Y1)+'), x2:X+Scl*('+X2+'), y2:Y+Scl*('+(-Y2) +')}';
		cizim2.push({Ad:"Line", layer:LayerName, Color:Color , Color24:Color24.trim(), LineScale:LineScale, LineType:LineType, Kalinlik:LineWeight, x1:X1, y1:Y1, x2:X2, y2:Y2});
		}			
	 //{Ad:"Circle",layer:"ByLayer",Color:"3",Color24:"",LineScale:"",LineType:"Continuous",Kalinlik:"13",x:140,y:200,r:55}
		}
		console.log("CİZİM :",cizim2 )
		document.getElementById("ais").textContent=document.getElementById("ais").textContent.substr(1)
		sahnekur();
		return dizin; 
		
		}

		function AttributeAl(katmanAdı, nitelik) {
			u = 0;
			while (katmanAdı != KATMANLAR[u][0]) {
			  u++;
			}
			switch (nitelik) {
			  case "LayerOnOff":
				sonuc = KATMANLAR[u][3];
				break;
			  case "lineColor":
				sonuc = KATMANLAR[u][4];
				break;
			  case "LayerlineTypeName":
				sonuc = KATMANLAR[u][5];
				break;
			  case "lineWeight":
				sonuc = KATMANLAR[u][6];
				break;
			  case "layerFreeze":
				sonuc = KATMANLAR[u][1];
				break;
			  case "layerLock":
				sonuc = KATMANLAR[u][2];
				break;
			}
			return sonuc;
		  }
function StrokeDashArrayHazirla(l_Type) {
	dashArray = [];
	if (l_Type == "ByBlock") {
	  Stroke_dasharray = "ByBlock";
	} else if (l_Type == "ByLayer") {
	  Stroke_dasharray = "ByLayer";
	} else {
	  no = l_typeName.indexOf(l_Type);
	  if (no != -1) {
		elemansayisi = LTYPES[no][1];
		Stroke_dasharray = "";
		for (m = 1; m <= elemansayisi; m++) {
		  Stroke_dasharray = Stroke_dasharray + "_" + parseInt(LTYPES[no][m + 1] * LineScale);
		  dashArray.push(parseInt(LTYPES[no][m + 1] * LineScale));
		}
		Stroke_dasharray = Stroke_dasharray.substring(1, Stroke_dasharray.length);
		Stroke_dasharray = Stroke_dasharray.replace("-", "");
		DASHARRAY.push(dashArray);
	  }
	}
	return Stroke_dasharray;
  }
function ColorIndex(index){
colorindex[0]='#000000 ';
colorindex[1]='#FF0000 ';
colorindex[2]='#FFFF00 ';
colorindex[3]='#00FF00 ';
colorindex[4]='#00FFFF ';
colorindex[5]='#0000FF ';
colorindex[6]='#FF00FF ';
colorindex[7]='#FFFFFF ';
colorindex[8]='#808080 ';
colorindex[9]='#C0C0C0 ';
colorindex[10]='#FF0000 ';
colorindex[11]='#FF7F7F ';
colorindex[12]='#A50000 ';
colorindex[13]='#A55252 ';
colorindex[14]='#7F0000 ';
colorindex[15]='#803F3F ';
colorindex[16]='#4C0000 ';
colorindex[17]='#4C2626 ';
colorindex[18]='#260000 ';
colorindex[19]='#261313 ';
colorindex[20]='#FF3F00 ';
colorindex[21]='#FF9F7F ';
colorindex[22]='#CC3300 ';
colorindex[23]='#CC7F66 ';
colorindex[24]='#992600 ';
colorindex[25]='#995F4C ';
colorindex[26]='#7F1F00 ';
colorindex[27]='#7F4F3F ';
colorindex[28]='#4C1300 ';
colorindex[29]='#4C2F26 ';
colorindex[30]='#FF7F00 ';
colorindex[31]='#FFBF7F ';
colorindex[32]='#CC6600 ';
colorindex[33]='#CC9966 ';
colorindex[34]='#994C00 ';
colorindex[35]='#99724C ';
colorindex[36]='#7F3F00 ';
colorindex[37]='#7F5F3F ';
colorindex[38]='#4C2600 ';
colorindex[39]='#4C3926 ';
colorindex[40]='#FFBF00 ';
colorindex[41]='#FFDF7F ';
colorindex[42]='#CC9900 ';
colorindex[43]='#CCB266 ';
colorindex[44]='#997200 ';
colorindex[45]='#99854C ';
colorindex[46]='#7F5F00 ';
colorindex[47]='#7F6F3F ';
colorindex[48]='#4C3900 ';
colorindex[49]='#4C4226 ';
colorindex[50]='#FFFF00 ';
colorindex[51]='#FFFF7F ';
colorindex[52]='#CCCC00 ';
colorindex[53]='#CCCC66 ';
colorindex[54]='#989800 ';
colorindex[55]='#98984C ';
colorindex[56]='#7F7F00 ';
colorindex[57]='#7F7F3F ';
colorindex[58]='#4C4C00 ';
colorindex[59]='#4C4C26 ';
colorindex[60]='#BFFF00 ';
colorindex[61]='#DFFF7F ';
colorindex[62]='#99CC00 ';
colorindex[63]='#B2CC66 ';
colorindex[64]='#729800 ';
colorindex[65]='#85984C ';
colorindex[66]='#5F7F00 ';
colorindex[67]='#6F7F3F ';
colorindex[68]='#394C00 ';
colorindex[69]='#424C26 ';
colorindex[70]='#7FFF00 ';
colorindex[71]='#BFFF7F ';
colorindex[72]='#66CC00 ';
colorindex[73]='#99CC66 ';
colorindex[74]='#4C9800 ';
colorindex[75]='#72984C ';
colorindex[76]='#3F7F00 ';
colorindex[77]='#5F7F3F ';
colorindex[78]='#264C00 ';
colorindex[79]='#394C26 ';
colorindex[80]='#3FFF00 ';
colorindex[81]='#9FFF7F ';
colorindex[82]='#33CC00 ';
colorindex[83]='#7FCC66 ';
colorindex[84]='#269800 ';
colorindex[85]='#5F984C ';
colorindex[86]='#1F7F00 ';
colorindex[87]='#4F7F3F ';
colorindex[88]='#134C00 ';
colorindex[89]='#2F4C26 ';
colorindex[90]='#00FF00 ';
colorindex[91]='#7FFF7F ';
colorindex[92]='#00CC00 ';
colorindex[93]='#66CC66 ';
colorindex[94]='#009800 ';
colorindex[95]='#4C984C ';
colorindex[96]='#007F00 ';
colorindex[97]='#3F7F3F ';
colorindex[98]='#004C00 ';
colorindex[99]='#264C26 ';
colorindex[100]='#00FF3F ';
colorindex[101]='#7FFF9F ';
colorindex[102]='#00CC33 ';
colorindex[103]='#66CC7F ';
colorindex[104]='#009826 ';
colorindex[105]='#4C985F ';
colorindex[106]='#007F1F ';
colorindex[107]='#3F7F4F ';
colorindex[108]='#004C13 ';
colorindex[109]='#264C2F ';
colorindex[110]='#00FF7F ';
colorindex[111]='#7FFFBF ';
colorindex[112]='#00CC66 ';
colorindex[113]='#66CC99 ';
colorindex[114]='#00984C ';
colorindex[115]='#4C9872 ';
colorindex[116]='#007F3F ';
colorindex[117]='#3F7F5F ';
colorindex[118]='#004C26 ';
colorindex[119]='#264C39 ';
colorindex[120]='#00FFBF ';
colorindex[121]='#7FFFDF ';
colorindex[122]='#00CC99 ';
colorindex[123]='#66CCB2 ';
colorindex[124]='#009872 ';
colorindex[125]='#4C9885 ';
colorindex[126]='#007F5F ';
colorindex[127]='#3F7F6F ';
colorindex[128]='#004C39 ';
colorindex[129]='#264C42 ';
colorindex[130]='#0019FF ';
colorindex[131]='#7FFFFF ';
colorindex[132]='#00CCCC ';
colorindex[133]='#66CCCC ';
colorindex[134]='#009898 ';
colorindex[135]='#4C9898 ';
colorindex[136]='#007F7F ';
colorindex[137]='#3F7F7F ';
colorindex[138]='#004C4C ';
colorindex[139]='#264C4C ';
colorindex[140]='#00BFFF ';
colorindex[141]='#7FDFFF ';
colorindex[142]='#0099CC ';
colorindex[143]='#66B2CC ';
colorindex[144]='#007298 ';
colorindex[145]='#4C8598 ';
colorindex[146]='#005F7F ';
colorindex[147]='#3F0B7F ';
colorindex[148]='#00394C ';
colorindex[149]='#26424C ';
colorindex[150]='#007FFF ';
colorindex[151]='#7FBFFF ';
colorindex[152]='#0066CC ';
colorindex[153]='#6699CC ';
colorindex[154]='#004C98 ';
colorindex[155]='#4C7298 ';
colorindex[156]='#003F7F ';
colorindex[157]='#3F5F7F ';
colorindex[158]='#00264C ';
colorindex[159]='#26394C ';
colorindex[160]='#003FFF ';
colorindex[161]='#7F9FFF ';
colorindex[162]='#0033CC ';
colorindex[163]='#667FCC ';
colorindex[164]='#002698 ';
colorindex[165]='#4C5F98 ';
colorindex[166]='#001F7F ';
colorindex[167]='#3F4F7F ';
colorindex[168]='#00134C ';
colorindex[169]='#262F4C ';
colorindex[170]='#0000FF ';
colorindex[171]='#7F7FFF ';
colorindex[172]='#0000CC ';
colorindex[173]='#6666CC ';
colorindex[174]='#000098 ';
colorindex[175]='#4C4C98 ';
colorindex[176]='#00007F ';
colorindex[177]='#3F3F7F ';
colorindex[178]='#00004C ';
colorindex[179]='#26264C ';
colorindex[180]='#3F00FF ';
colorindex[181]='#9F7FFF ';
colorindex[182]='#3300CC ';
colorindex[183]='#7F66CC ';
colorindex[184]='#260098 ';
colorindex[185]='#5F4C98 ';
colorindex[186]='#1F007F ';
colorindex[187]='#4F3F7F ';
colorindex[188]='#13004C ';
colorindex[189]='#131758 ';
colorindex[190]='#7F00FF ';
colorindex[191]='#BF7FFF ';
colorindex[192]='#6600CC ';
colorindex[193]='#9966CC ';
colorindex[194]='#4C0098 ';
colorindex[195]='#724C98 ';
colorindex[196]='#3F007F ';
colorindex[197]='#5F3F7F ';
colorindex[198]='#26004C ';
colorindex[199]='#39264C ';
colorindex[200]='#BF00FF ';
colorindex[201]='#DF7FFF ';
colorindex[202]='#9900CC ';
colorindex[203]='#B266CC ';
colorindex[204]='#720098 ';
colorindex[205]='#854C98 ';
colorindex[206]='#5F007F ';
colorindex[207]='#6F3F7F ';
colorindex[208]='#39004C ';
colorindex[209]='#42264C ';
colorindex[210]='#9B00FF ';
colorindex[211]='#9B7FFF ';
colorindex[212]='#CC00CC ';
colorindex[213]='#CC66CC ';
colorindex[214]='#980098 ';
colorindex[215]='#984C98 ';
colorindex[216]='#7F007F ';
colorindex[217]='#7F3F7F ';
colorindex[218]='#4C004C ';
colorindex[219]='#4C264C ';
colorindex[220]='#FF00BF ';
colorindex[221]='#FF7FDF ';
colorindex[222]='#CC0099 ';
colorindex[223]='#CC66B2 ';
colorindex[224]='#980072 ';
colorindex[225]='#984C85 ';
colorindex[226]='#7F005F ';
colorindex[227]='#7F28DB ';
colorindex[228]='#4C0039 ';
colorindex[229]='#4C2642 ';
colorindex[230]='#FF007F ';
colorindex[231]='#FF7FBF ';
colorindex[232]='#CC0066 ';
colorindex[233]='#CC6699 ';
colorindex[234]='#98004C ';
colorindex[235]='#984C72 ';
colorindex[236]='#7F003F ';
colorindex[237]='#7F3F5F ';
colorindex[238]='#4C0026 ';
colorindex[239]='#4C2639 ';
colorindex[240]='#FF003F ';
colorindex[241]='#FF7F9F ';
colorindex[242]='#CC0033 ';
colorindex[243]='#CC667F ';
colorindex[244]='#980026 ';
colorindex[245]='#984C5F ';
colorindex[246]='#7F001F ';
colorindex[247]='#7F3F4F ';
colorindex[248]='#4C0013 ';
colorindex[249]='#4C262F ';
colorindex[250]='#333333 ';
colorindex[251]='#5F5B5B ';
colorindex[252]='#848484 ';
colorindex[253]='#ADADAD ';
colorindex[254]='#D6D6D6 ';
colorindex[255]='#FFFFFF ';
var sonuc=colorindex[index]
if(sonuc==undefined){
	sonuc=""
}
return sonuc;
}
function ColorIndex1(index){
var	sonuc;
switch (index){
case 0:  sonuc='000000';  break;		
case 1:  sonuc='FF0000';  break;
case 2:  sonuc='FFFF00';  break;
case 3:  sonuc='00FF00';  break;
case 4:  sonuc='00FFFF';  break;
case 5:  sonuc='0000FF';  break;
case 6:  sonuc='FF00FF';  break;
case 7:  sonuc='FFFFFF';  break;
case 8:  sonuc='808080';  break;
case 9:  sonuc='C0C0C0';  break;
case 10:  sonuc='FF0000';  break;
case 11:  sonuc='FF7F7F';  break;
case 12:  sonuc='A50000';  break;
case 13:  sonuc='A55252';  break;
case 14:  sonuc='7F0000';  break;
case 15:  sonuc='803F3F';  break;
case 16:  sonuc='4C0000';  break;
case 17:  sonuc='4C2626';  break;
case 18:  sonuc='260000';  break;
case 19:  sonuc='261313';  break;
case 20:  sonuc='FF3F00';  break;
case 21:  sonuc='FF9F7F';  break;
case 22:  sonuc='CC3300';  break;
case 23:  sonuc='CC7F66';  break;
case 24:  sonuc='992600';  break;
case 25:  sonuc='995F4C';  break;
case 26:  sonuc='7F1F00';  break;
case 27:  sonuc='7F4F3F';  break;
case 28:  sonuc='4C1300';  break;
case 29:  sonuc='4C2F26';  break;
case 30:  sonuc='FF7F00';  break;
case 31:  sonuc='FFBF7F';  break;
case 32:  sonuc='CC6600';  break;
case 33:  sonuc='CC9966';  break;
case 34:  sonuc='994C00';  break;
case 35:  sonuc='99724C';  break;
case 36:  sonuc='7F3F00';  break;
case 37:  sonuc='7F5F3F';  break;
case 38:  sonuc='4C2600';  break;
case 39:  sonuc='4C3926';  break;
case 40:  sonuc='FFBF00';  break;
case 41:  sonuc='FFDF7F';  break;
case 42:  sonuc='CC9900';  break;
case 43:  sonuc='CCB266';  break;
case 44:  sonuc='997200';  break;
case 45:  sonuc='99854C';  break;
case 46:  sonuc='7F5F00';  break;
case 47:  sonuc='7F6F3F';  break;
case 48:  sonuc='4C3900';  break;
case 49:  sonuc='4C4226';  break;
case 50:  sonuc='FFFF00';  break;
case 51:  sonuc='FFFF7F';  break;
case 52:  sonuc='CCCC00';  break;
case 53:  sonuc='CCCC66';  break;
case 54:  sonuc='989800';  break;
case 55:  sonuc='98984C';  break;
case 56:  sonuc='7F7F00';  break;
case 57:  sonuc='7F7F3F';  break;
case 58:  sonuc='4C4C00';  break;
case 59:  sonuc='4C4C26';  break;
case 60:  sonuc='BFFF00';  break;
case 61:  sonuc='DFFF7F';  break;
case 62:  sonuc='99CC00';  break;
case 63:  sonuc='B2CC66';  break;
case 64:  sonuc='729800';  break;
case 65:  sonuc='85984C';  break;
case 66:  sonuc='5F7F00';  break;
case 67:  sonuc='6F7F3F';  break;
case 68:  sonuc='394C00';  break;
case 69:  sonuc='424C26';  break;
case 70:  sonuc='7FFF00';  break;
case 71:  sonuc='BFFF7F';  break;
case 72:  sonuc='66CC00';  break;
case 73:  sonuc='99CC66';  break;
case 74:  sonuc='4C9800';  break;
case 75:  sonuc='72984C';  break;
case 76:  sonuc='3F7F00';  break;
case 77:  sonuc='5F7F3F';  break;
case 78:  sonuc='264C00';  break;
case 79:  sonuc='394C26';  break;
case 80:  sonuc='3FFF00';  break;
case 81:  sonuc='9FFF7F';  break;
case 82:  sonuc='33CC00';  break;
case 83:  sonuc='7FCC66';  break;
case 84:  sonuc='269800';  break;
case 85:  sonuc='5F984C';  break;
case 86:  sonuc='1F7F00';  break;
case 87:  sonuc='4F7F3F';  break;
case 88:  sonuc='134C00';  break;
case 89:  sonuc='2F4C26';  break;
case 90:  sonuc='00FF00';  break;
case 91:  sonuc='7FFF7F';  break;
case 92:  sonuc='00CC00';  break;
case 93:  sonuc='66CC66';  break;
case 94:  sonuc='009800';  break;
case 95:  sonuc='4C984C';  break;
case 96:  sonuc='007F00';  break;
case 97:  sonuc='3F7F3F';  break;
case 98:  sonuc='004C00';  break;
case 99:  sonuc='264C26';  break;
case 100:  sonuc='00FF3F';  break;
case 101:  sonuc='7FFF9F';  break;
case 102:  sonuc='00CC33';  break;
case 103:  sonuc='66CC7F';  break;
case 104:  sonuc='009826';  break;
case 105:  sonuc='4C985F';  break;
case 106:  sonuc='007F1F';  break;
case 107:  sonuc='3F7F4F';  break;
case 108:  sonuc='004C13';  break;
case 109:  sonuc='264C2F';  break;
case 110:  sonuc='00FF7F';  break;
case 111:  sonuc='7FFFBF';  break;
case 112:  sonuc='00CC66';  break;
case 113:  sonuc='66CC99';  break;
case 114:  sonuc='00984C';  break;
case 115:  sonuc='4C9872';  break;
case 116:  sonuc='007F3F';  break;
case 117:  sonuc='3F7F5F';  break;
case 118:  sonuc='004C26';  break;
case 119:  sonuc='264C39';  break;
case 120:  sonuc='00FFBF';  break;
case 121:  sonuc='7FFFDF';  break;
case 122:  sonuc='00CC99';  break;
case 123:  sonuc='66CCB2';  break;
case 124:  sonuc='009872';  break;
case 125:  sonuc='4C9885';  break;
case 126:  sonuc='007F5F';  break;
case 127:  sonuc='3F7F6F';  break;
case 128:  sonuc='004C39';  break;
case 129:  sonuc='264C42';  break;
case 130:  sonuc='0019FF';  break;
case 131:  sonuc='7FFFFF';  break;
case 132:  sonuc='00CCCC';  break;
case 133:  sonuc='66CCCC';  break;
case 134:  sonuc='009898';  break;
case 135:  sonuc='4C9898';  break;
case 136:  sonuc='007F7F';  break;
case 137:  sonuc='3F7F7F';  break;
case 138:  sonuc='004C4C';  break;
case 139:  sonuc='264C4C';  break;
case 140:  sonuc='00BFFF';  break;
case 141:  sonuc='7FDFFF';  break;
case 142:  sonuc='0099CC';  break;
case 143:  sonuc='66B2CC';  break;
case 144:  sonuc='007298';  break;
case 145:  sonuc='4C8598';  break;
case 146:  sonuc='005F7F';  break;
case 147:  sonuc='3F0B7F';  break;
case 148:  sonuc='00394C';  break;
case 149:  sonuc='26424C';  break;
case 150:  sonuc='007FFF';  break;
case 151:  sonuc='7FBFFF';  break;
case 152:  sonuc='0066CC';  break;
case 153:  sonuc='6699CC';  break;
case 154:  sonuc='004C98';  break;
case 155:  sonuc='4C7298';  break;
case 156:  sonuc='003F7F';  break;
case 157:  sonuc='3F5F7F';  break;
case 158:  sonuc='00264C';  break;
case 159:  sonuc='26394C';  break;
case 160:  sonuc='003FFF';  break;
case 161:  sonuc='7F9FFF';  break;
case 162:  sonuc='0033CC';  break;
case 163:  sonuc='667FCC';  break;
case 164:  sonuc='002698';  break;
case 165:  sonuc='4C5F98';  break;
case 166:  sonuc='001F7F';  break;
case 167:  sonuc='3F4F7F';  break;
case 168:  sonuc='00134C';  break;
case 169:  sonuc='262F4C';  break;
case 170:  sonuc='0000FF';  break;
case 171:  sonuc='7F7FFF';  break;
case 172:  sonuc='0000CC';  break;
case 173:  sonuc='6666CC';  break;
case 174:  sonuc='000098';  break;
case 175:  sonuc='4C4C98';  break;
case 176:  sonuc='00007F';  break;
case 177:  sonuc='3F3F7F';  break;
case 178:  sonuc='00004C';  break;
case 179:  sonuc='26264C';  break;
case 180:  sonuc='3F00FF';  break;
case 181:  sonuc='9F7FFF';  break;
case 182:  sonuc='3300CC';  break;
case 183:  sonuc='7F66CC';  break;
case 184:  sonuc='260098';  break;
case 185:  sonuc='5F4C98';  break;
case 186:  sonuc='1F007F';  break;
case 187:  sonuc='4F3F7F';  break;
case 188:  sonuc='13004C';  break;
case 189:  sonuc='131758';  break;
case 190:  sonuc='7F00FF';  break;
case 191:  sonuc='BF7FFF';  break;
case 192:  sonuc='6600CC';  break;
case 193:  sonuc='9966CC';  break;
case 194:  sonuc='4C0098';  break;
case 195:  sonuc='724C98';  break;
case 196:  sonuc='3F007F';  break;
case 197:  sonuc='5F3F7F';  break;
case 198:  sonuc='26004C';  break;
case 199:  sonuc='39264C';  break;
case 200:  sonuc='BF00FF';  break;
case 201:  sonuc='DF7FFF';  break;
case 202:  sonuc='9900CC';  break;
case 203:  sonuc='B266CC';  break;
case 204:  sonuc='720098';  break;
case 205:  sonuc='854C98';  break;
case 206:  sonuc='5F007F';  break;
case 207:  sonuc='6F3F7F';  break;
case 208:  sonuc='39004C';  break;
case 209:  sonuc='42264C';  break;
case 210:  sonuc='9B00FF';  break;
case 211:  sonuc='9B7FFF';  break;
case 212:  sonuc='CC00CC';  break;
case 213:  sonuc='CC66CC';  break;
case 214:  sonuc='980098';  break;
case 215:  sonuc='984C98';  break;
case 216:  sonuc='7F007F';  break;
case 217:  sonuc='7F3F7F';  break;
case 218:  sonuc='4C004C';  break;
case 219:  sonuc='4C264C';  break;
case 220:  sonuc='FF00BF';  break;
case 221:  sonuc='FF7FDF';  break;
case 222:  sonuc='CC0099';  break;
case 223:  sonuc='CC66B2';  break;
case 224:  sonuc='980072';  break;
case 225:  sonuc='984C85';  break;
case 226:  sonuc='7F005F';  break;
case 227:  sonuc='7F28DB';  break;
case 228:  sonuc='4C0039';  break;
case 229:  sonuc='4C2642';  break;
case 230:  sonuc='FF007F';  break;
case 231:  sonuc='FF7FBF';  break;
case 232:  sonuc='CC0066';  break;
case 233:  sonuc='CC6699';  break;
case 234:  sonuc='98004C';  break;
case 235:  sonuc='984C72';  break;
case 236:  sonuc='7F003F';  break;
case 237:  sonuc='7F3F5F';  break;
case 238:  sonuc='4C0026';  break;
case 239:  sonuc='4C2639';  break;
case 240:  sonuc='FF003F';  break;
case 241:  sonuc='FF7F9F';  break;
case 242:  sonuc='CC0033';  break;
case 243:  sonuc='CC667F';  break;
case 244:  sonuc='980026';  break;
case 245:  sonuc='984C5F';  break;
case 246:  sonuc='7F001F';  break;
case 247:  sonuc='7F3F4F';  break;
case 248:  sonuc='4C0013';  break;
case 249:  sonuc='4C262F';  break;
case 250:  sonuc='333333';  break;
case 251:  sonuc='5F5B5B';  break;
case 252:  sonuc='848484';  break;
case 253:  sonuc='ADADAD';  break;
case 254:  sonuc='D6D6D6';  break;
case 255:  sonuc='FFFFFF';  break;


	}
	
	return sonuc;
}
