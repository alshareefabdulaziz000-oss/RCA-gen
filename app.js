function V(i){return document.getElementById(i).value.trim()}
function gH(){var v=V(“hosp”);return v===“other”?V(“hospO”):v}
function gA(){var s=document.getElementById(“act”),r=[];for(var i=0;i<s.options.length;i++)if(s.options[i].selected)r.push(s.options[i].value);return r}
function fD(d){if(!d)return””;var x=new Date(d),m=[“Jan”,“Feb”,“Mar”,“Apr”,“May”,“Jun”,“Jul”,“Aug”,“Sep”,“Oct”,“Nov”,“Dec”];return m[x.getMonth()]+” “+x.getDate()+”, “+x.getFullYear()}
function dD(d){if(!d)return””;var x=new Date(d);return x.getDate()+”-”+(x.getMonth()+1)+”-”+x.getFullYear()}

var LOGO=”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”;

function go(){
var btn=document.getElementById(“gB”);
btn.disabled=true;
btn.textContent=“Generating…”;
try{
var doc=buildPDF();
var url=doc.output(“bloburl”);
window.location.href=url;
btn.textContent=“PDF Ready!”;
}catch(e){
alert(“Error: “+e.message);
btn.textContent=“Error - Retry”;
}
setTimeout(function(){btn.textContent=“Generate RCA Report (PDF)”;btn.disabled=false},3000);
}

function buildPDF(){
var t=D.e[parseInt(V(“eT”))];
var sv=D.sev[parseInt(V(“sev”))];
var pn=V(“pN”),mrn=V(“mrn”),age=V(“age”),gen=V(“gen”),ward=V(“ward”),cc=V(“cc”);
var meds=V(“meds”),notes=V(“notes”),resp=V(“resp”)||“Medical Director”;
var stage=V(“stg”),actions=gA(),hosp=gH();
var desc=t.d.replace(/XMEDSX/g,meds);
var what=“A “+age+”-year-old “+gen.toLowerCase()+” patient (MRN: “+mrn+”) presented to “+ward+” with “+cc+”. During the “+stage.toLowerCase()+” stage, “+desc+”. Identified via institutional error detection and reported through OVR and SPSC portal.”+(notes?” Details: “+notes:””);

var jsPDF=window.jspdf.jsPDF;
var doc=new jsPDF({unit:“mm”,format:“a4”});
var W=210,M=14,CW=W-2*M,y=M;
var blue=[3,105,161],dk=[12,74,110],gr=[26,122,58],red=[176,48,48];

// Header
try{doc.addImage(“data:image/jpeg;base64,”+LOGO,“JPEG”,W-M-42,y-2,42,19)}catch(x){}
doc.setFontSize(8);doc.setTextColor(40);doc.setFont(“helvetica”,“bold”);
if(hosp)doc.text(hosp,M,y+8);
y+=22;
doc.setDrawColor(blue[0],blue[1],blue[2]);doc.setLineWidth(1);doc.line(M,y,W-M,y);y+=3;
doc.setFontSize(13);doc.setTextColor(blue[0],blue[1],blue[2]);
doc.text(“Root Cause Analysis Report”,W/2,y+5,{align:“center”});
doc.setFontSize(7);doc.setTextColor(80);doc.setFont(“helvetica”,“normal”);
doc.text(“Medication Safety | SPSC Aligned | MOH Policies”,W/2,y+9,{align:“center”});
y+=13;
doc.setFontSize(6.5);doc.setTextColor(130);
doc.text(“RCA-”+mrn+”-”+(new Date()).getFullYear()+” | CBAHI: “+t.cb+” | “+t.spsc+” | Confidential”,W-M,y+1,{align:“right”});y+=4;

function secH(title){
if(y>255){doc.addPage();y=M;}
doc.setFillColor(blue[0],blue[1],blue[2]);doc.rect(M,y,CW,6,“F”);
doc.setFontSize(9);doc.setTextColor(255);doc.setFont(“helvetica”,“bold”);
doc.text(title,W/2,y+4.2,{align:“center”});y+=8;doc.setTextColor(0);
}

function addR(label,value,yn){
if(y>265){doc.addPage();y=M;}
var lw=48,yw=16,vw=CW-lw-(yn!==undefined?yw:0);
doc.setFontSize(7.5);doc.setFont(“helvetica”,“bold”);doc.setTextColor(20);
var lL=doc.splitTextToSize(label,lw-3);doc.text(lL,M+2,y+3.5);
if(yn!==undefined){
doc.setFont(“helvetica”,“normal”);doc.setFontSize(7);doc.setTextColor(gr[0],gr[1],gr[2]);
doc.text(yn?”[Y] Yes  No”:“Yes  No [Y]”,M+lw+1,y+3.5);
}
doc.setFont(“helvetica”,“normal”);doc.setFontSize(7.5);doc.setTextColor(40);
var vx=M+lw+(yn!==undefined?yw:0)+2;
var vL=doc.splitTextToSize(value,vw-3);doc.text(vL,vx,y+3.5);
var rh=Math.max(lL.length,vL.length)*3.2+2.5;
doc.setDrawColor(200);doc.setLineWidth(0.15);doc.line(M,y+rh,W-M,y+rh);y+=rh+0.5;
}

function addT(title){
if(y>258){doc.addPage();y=M;}
doc.setFontSize(10);doc.setTextColor(blue[0],blue[1],blue[2]);doc.setFont(“helvetica”,“bold”);
doc.text(title,M,y+3);doc.setDrawColor(blue[0],blue[1],blue[2]);doc.setLineWidth(0.5);
doc.line(M,y+4.5,W-M,y+4.5);y+=7;
}

// Report info table
doc.autoTable({startY:y,margin:{left:M,right:M},
head:[[V(“rcaT”)+” RCA”,“Date: “+fD(V(“dI”))+” to “+fD(V(“dC”)),“Stage: “+stage]],
body:[[“Patient: “+pn+” (”+age+“y, “+gen+”)”,“MRN: “+mrn,“Location: “+ward],
[“Reached Patient: “+V(“erR”),“Type: “+t.spsc,“NCC MERP: “+sv.l],
[“Rx: “+V(“rxT”),“Ownership: “+V(“own”),“Dx: “+cc]],
styles:{fontSize:7,cellPadding:2,font:“helvetica”},
headStyles:{fillColor:blue,textColor:255,fontStyle:“bold”,fontSize:7.5},theme:“grid”});
y=doc.lastAutoTable.finalY+3;

secH(“SECTION 1: EVENT DESCRIPTION”);
addR(“Event Description”,what);
addR(“Date/Time/Shift”,fD(V(“iD”))+”, “+(V(“iT”)||“N/A”)+“H, “+V(“sh”)+” shift”);
addR(“Location (SPSC)”,ward);
addR(“Personnel”,ward+” Physician, Pharmacy, Nursing”);
addR(“Reporting”,“OVR filed. SPSC portal per MOH/MSPP/0007/01.”);

secH(“SECTION 2: CAUSAL FACTORS”);
addR(“Contributing Factors”,“1. Knowledge deficit re: “+t.l.toLowerCase()+” and CBAHI “+t.cb+”\n2. Cognitive overload from high volume\n3. Communication barriers\n4. Behavioral normalization of deviations\n5. System pressure creating time constraints”);
addR(“Training”,t.l+” prevention not embedded in CME framework.”,true);
addR(“Competence”,“Gap identified in “+t.l.toLowerCase()+” prevention competencies.”,true);
addR(“Communication”,“Interdisciplinary communication insufficient. SBAR not consistently used.”,true);

secH(“SECTION 3: PROCESS AND SYSTEMS”);
addR(“Process Failure”,“Critical failure at “+stage.toLowerCase()+” step. Swiss Cheese Model defense-in-depth approach needed.”,true);
addR(“Equipment”,“Absence of electronic safety systems (CPOE/BCMA/eMAR). Technology investment recommended.”,true);
addR(“Policy”,“Policy per CBAHI “+t.cb+” exists but implementation gap identified. No systematic audit program.”,true);

addT(“FORMAL RECOMMENDATIONS”);
doc.autoTable({startY:y,margin:{left:M,right:M},
head:[[”#”,“Category”,“Recommendation”,“Timeline”]],
body:[
[“1”,“Education”,“Mandatory CME on “+t.l+” prevention. CBAHI “+t.cb+” standards. Competency verification.”,“14 days”],
[“2”,“Process”,“Redesign “+stage.toLowerCase()+” workflow with verification checkpoints. Evaluate CPOE/BCMA.”,“30 days”],
[“3”,“Governance”,“Monthly PT&C dashboard. KPIs: “+t.l+” rate, compliance, CAPA completion.”,“30 days”],
[“4”,“Safety Culture”,“Non-punitive reporting. Monthly safety huddles. Patient engagement.”,“60 days”]],
styles:{fontSize:6.5,cellPadding:2,font:“helvetica”,overflow:“linebreak”},
headStyles:{fillColor:dk,textColor:255,fontStyle:“bold”},
columnStyles:{0:{cellWidth:7,halign:“center”},1:{cellWidth:16,fontStyle:“bold”},3:{cellWidth:16,halign:“center”}},
theme:“grid”});y=doc.lastAutoTable.finalY+3;

addT(“ROOT CAUSE AND ACTION PLAN”);
doc.autoTable({startY:y,margin:{left:M,right:M},
head:[[“Root Cause”,“Strategies”,“Responsible”,“Date”]],
body:[
[{content:t.r,rowSpan:3},“1. Education with competency verification. 14 days.”,{content:resp,rowSpan:3},{content:fD(V(“dC”)),rowSpan:3}],
[“2. Workflow redesign with checkpoints. 30 days.”],
[“3. Monthly compliance audit. First at 60 days.”]],
styles:{fontSize:6.5,cellPadding:2,font:“helvetica”,overflow:“linebreak”},
headStyles:{fillColor:dk,textColor:255,fontStyle:“bold”},
columnStyles:{0:{cellWidth:42},2:{cellWidth:20,halign:“center”},3:{cellWidth:20,halign:“center”}},
theme:“grid”});y=doc.lastAutoTable.finalY+3;

if(actions.length>0){
addT(“SPSC ACTION TAKEN”);
var ab=actions.map(function(a,i){return[(i+1)+””,a]});
doc.autoTable({startY:y,margin:{left:M,right:M},head:[[”#”,“Action (SPSC)”]],body:ab,
styles:{fontSize:7,cellPadding:2,font:“helvetica”},headStyles:{fillColor:dk,textColor:255,fontStyle:“bold”},
columnStyles:{0:{cellWidth:8,halign:“center”}},theme:“grid”});y=doc.lastAutoTable.finalY+3;
}

addT(“NCC MERP SEVERITY”);
if(y>260){doc.addPage();y=M;}
doc.setFillColor(224,240,232);doc.roundedRect(M,y,CW,8,1.5,1.5,“F”);
doc.setFontSize(8.5);doc.setTextColor(gr[0],gr[1],gr[2]);doc.setFont(“helvetica”,“bold”);
doc.text(sv.l+” - “+sv.d,M+4,y+5.5);y+=11;
doc.setFontSize(7);doc.setTextColor(40);doc.setFont(“helvetica”,“normal”);
var jL=doc.splitTextToSize(“Justification: “+sv.j,CW);doc.text(jL,M,y);y+=jL.length*3+5;

addT(“CORRECTIVE ACTION PLAN”);
var ap=“Immediate (72hrs): Memorandum to “+resp+” and “+ward+” staff. SPSC reporting. Short-term (14 days): CME with competency verification. Medium-term (30 days): Workflow redesign with checkpoints. Sustained: Monthly audits, quarterly PT&C, annual review.”;
doc.setFontSize(7);doc.setTextColor(40);doc.setFont(“helvetica”,“normal”);
var aL=doc.splitTextToSize(ap,CW);if(y+aL.length*3>270){doc.addPage();y=M;}
doc.text(aL,M,y);y+=aL.length*3+5;

// Fishbone
if(y>190){doc.addPage();y=M;}
addT(“ISHIKAWA FISHBONE DIAGRAM”);
var cy=y+30,cx=W/2,spL=65;
doc.setDrawColor(blue[0],blue[1],blue[2]);doc.setLineWidth(0.8);doc.line(cx-spL,cy,cx+spL,cy);
doc.setFillColor(blue[0],blue[1],blue[2]);doc.triangle(cx+spL,cy,cx+spL-3,cy-2,cx+spL-3,cy+2,“F”);
doc.setFillColor(red[0],red[1],red[2]);doc.roundedRect(cx+spL+2,cy-5,40,10,1.5,1.5,“F”);
doc.setFontSize(5.5);doc.setTextColor(255);doc.setFont(“helvetica”,“bold”);
doc.text(“MEDICATION”,cx+spL+22,cy-0.5,{align:“center”});doc.text(“ERROR”,cx+spL+22,cy+3,{align:“center”});

var cats=[{n:“MANPOWER”,items:t.fh,bx:cx-spL/2,top:true},{n:“METHOD”,items:t.fm,bx:cx+spL/4,top:true},{n:“MATERIAL”,items:t.ft,bx:cx-spL/2,top:false},{n:“ENVIRONMENT”,items:t.fe,bx:cx+spL/4,top:false}];
cats.forEach(function(c){
var tipY=c.top?cy-22:cy+22;
doc.setDrawColor(blue[0],blue[1],blue[2]);doc.setLineWidth(0.5);doc.line(c.bx,cy,c.bx,tipY);
var ly=c.top?tipY-5:tipY+1;
doc.setFillColor(blue[0],blue[1],blue[2]);doc.roundedRect(c.bx-17,ly,34,4.5,0.8,0.8,“F”);
doc.setFontSize(5.5);doc.setTextColor(255);doc.setFont(“helvetica”,“bold”);
doc.text(c.n,c.bx,ly+3.2,{align:“center”});
doc.setTextColor(50);doc.setFont(“helvetica”,“normal”);doc.setFontSize(5);
c.items.forEach(function(item,j){
var iy=c.top?tipY-(j*3.5+7):tipY+(j*3.5+6.5);
doc.setDrawColor(160);doc.setLineWidth(0.2);
doc.line(c.bx,c.top?tipY-(j*3.5+4.5):tipY+(j*3.5+4),c.bx+3,iy-0.5);
doc.text(”- “+item,c.bx+4,iy);
});
});
doc.setTextColor(0);y=cy+40;

// Signatures
if(y>230){doc.addPage();y=M;}
addT(“AUTHORIZATION AND SIGNATURES”);
doc.autoTable({startY:y,margin:{left:M,right:M},
body:[
[{content:“Prepared by:\n”+V(“s1”)+”\n”+V(“s1r”),styles:{fontStyle:“bold”}},{content:“Reviewed by:\n”+V(“s2”)+”\nPharmacy Manager”,styles:{fontStyle:“bold”}}],
[V(“s3”)+”\nQuality Coordinator”,V(“s4”)+”\nDirector QM”],
[{content:V(“s5”)+”\nMedical Director & Chairman PT&C”,colSpan:2,styles:{halign:“center”,fontStyle:“bold”}}]],
styles:{fontSize:7.5,cellPadding:3.5,font:“helvetica”},theme:“grid”});
y=doc.lastAutoTable.finalY+5;

doc.setFontSize(7);doc.setTextColor(120);
doc.text(dD(V(“dC”))+” | “+(hosp||””)+” | Aseer Health Cluster | Confidential”,W/2,y,{align:“center”});

return doc;
}
