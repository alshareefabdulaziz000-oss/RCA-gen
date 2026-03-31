const fs = require(‘fs’);
const errors = JSON.parse(fs.readFileSync(‘errors.json’, ‘utf8’));

// Build select options grouped by category
const cats = {};
errors.forEach(e => { if (!cats[e.cat]) cats[e.cat] = []; cats[e.cat].push(e); });
let opts = ‘’;
for (const [cat, items] of Object.entries(cats)) {
opts += `<optgroup label="${cat} Errors">`;
items.forEach(e => { opts += `<option value="${e.id}">${e.l}</option>`; });
opts += `</optgroup>`;
}

const sevLabels = [
‘A - Capacity to cause error’,
‘B - Error did not reach patient’,
‘C - Reached patient, no harm’,
‘D - Required monitoring’,
‘E - Temporary harm, intervention’,
‘F - Temporary harm, hospitalization’,
‘G - Permanent harm’,
‘H - Life-sustaining intervention’,
‘I - Contributed to death’
];
let sevOpts = ‘’;
sevLabels.forEach((s, i) => { sevOpts += `<option value="${i}">${s}</option>`; });

const ERRORS_JSON = JSON.stringify(errors);

const html = `<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>RCA Generator - Aseer Health Cluster</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"><\/script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,sans-serif;background:#f0f4f8;color:#1a2332}
header{background:linear-gradient(135deg,#0369a1,#0c4a6e);color:#fff;padding:20px 16px;text-align:center;position:sticky;top:0;z-index:50;box-shadow:0 2px 12px rgba(3,105,161,.4)}
header h1{font-size:18px;font-weight:800}
header p{font-size:11px;opacity:.75;margin-top:3px}
.wrap{max-width:640px;margin:0 auto;padding:12px}
.card{background:#fff;border-radius:12px;padding:16px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.06);border:1px solid #e2e8f0}
.card-title{font-size:13px;font-weight:700;color:#0c4a6e;margin-bottom:12px;padding-bottom:6px;border-bottom:2px solid #38bdf8}
.row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
.row.full{grid-template-columns:1fr}
.row.tri{grid-template-columns:1fr 1fr 1fr}
label{display:block;font-size:11px;font-weight:600;color:#475569;margin-bottom:2px}
input,select,textarea{width:100%;padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:13px;background:#f8fafc;transition:border .15s}
input:focus,select:focus,textarea:focus{outline:none;border-color:#0369a1;box-shadow:0 0 0 3px rgba(3,105,161,.1)}
textarea{min-height:50px;resize:vertical}
.sig-row{display:grid;grid-template-columns:100px 1fr;gap:6px;align-items:center;margin-bottom:4px}
.sig-row span{font-size:10px;font-weight:600;color:#64748b}
.sig-row input{font-size:11px;padding:6px 8px}
.btn{width:100%;padding:14px;background:linear-gradient(135deg,#15803d,#14532d);color:#fff;border:none;border-radius:10px;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(21,128,61,.3);margin-top:4px;margin-bottom:16px}
.btn:active{transform:scale(.98)}.btn:disabled{opacity:.5;pointer-events:none}
.note{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px;font-size:11px;color:#1e40af;margin-bottom:12px;line-height:1.5}
.note b{color:#1e3a8a}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:999}
.overlay.show{display:flex}
.loader{background:#fff;padding:28px;border-radius:16px;text-align:center;width:260px}
.spinner{width:32px;height:32px;border:4px solid #e2e8f0;border-top-color:#0369a1;border-radius:50%;animation:spin .6s linear infinite;margin:0 auto 10px}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body>
<header>
<h1>RCA Report Generator</h1>
<p>Root Cause Analysis - Aseer Health Cluster - Medication Safety</p>
</header>
<div class="wrap">
<div class="note"><b>33 medication error types</b> based on MOH policies, CBAHI standards, SFDA regulations and NCC MERP (A-I). Fill in details and generate a professional PDF.</div>

<div class="card"><div class="card-title">Report Info</div>
<div class="row"><div><label>RCA Type</label><select id="rcaType"><option value="Accelerated">Accelerated</option><option value="Formal">Formal</option></select></div>
<div><label>Error Reached Patient?</label><select id="erReach"><option value="NO">NO</option><option value="YES">YES</option></select></div></div>
<div class="row"><div><label>Date Initiated</label><input type="date" id="dInit"></div>
<div><label>Date Completed</label><input type="date" id="dComp"></div></div></div>

<div class="card"><div class="card-title">Patient Info</div>
<div class="row"><div><label>Patient Name</label><input id="pName" placeholder="Full name"></div>
<div><label>MRN</label><input id="mrn" placeholder="Medical Record #"></div></div>
<div class="row tri"><div><label>Age</label><input type="number" id="age" placeholder="yrs"></div>
<div><label>Gender</label><select id="gender"><option value="male">Male</option><option value="female">Female</option></select></div>
<div><label>Dept</label><input id="ward" value="ER"></div></div>
<div class="row full"><div><label>Chief Complaint</label><input id="cc" placeholder="e.g. headache, URTI"></div></div></div>

<div class="card"><div class="card-title">Error Details</div>
<div class="row full"><div><label>Error Type</label><select id="eType">${opts}</select></div></div>
<div class="row full"><div><label>Medication(s)</label><input id="meds" placeholder="e.g. Paracetamol 500mg tab"></div></div>
<div class="row full"><div><label>Notes (optional)</label><textarea id="notes" rows="2" placeholder="Additional details..."></textarea></div></div>
<div class="row tri"><div><label>Date</label><input type="date" id="iDate"></div>
<div><label>Time</label><input type="time" id="iTime"></div>
<div><label>Shift</label><select id="shift"><option>PM</option><option>AM</option><option>Night</option></select></div></div></div>

<div class="card"><div class="card-title">NCC MERP Severity</div>
<div class="row full"><div><label>Category</label><select id="sev">${sevOpts}</select></div></div>
<div class="row full"><div><label>Responsible Person</label><input id="resp" placeholder="e.g. Medical Director"></div></div></div>

<div class="card"><div class="card-title">Signatures</div>
<div class="sig-row"><span>Prepared by:</span><input id="s1"></div>
<div class="sig-row"><span>Title:</span><input id="s1r" placeholder="e.g. MSO"></div>
<div class="sig-row"><span>Pharm Mgr:</span><input id="s2"></div>
<div class="sig-row"><span>Quality:</span><input id="s3"></div>
<div class="sig-row"><span>Dir QM:</span><input id="s4"></div>
<div class="sig-row"><span>Med Dir:</span><input id="s5"></div>
</div>

<button class="btn" id="gBtn" onclick="generateRCA()">Generate RCA Report (PDF)</button>

</div>

<div class="overlay" id="ov"><div class="loader"><div class="spinner"></div><p>Generating PDF...</p></div></div>

<script>
var now=new Date(),iso=now.toISOString().split('T')[0];
document.getElementById('dInit').value=iso;
document.getElementById('iDate').value=iso;
var c=new Date(now);c.setDate(c.getDate()+4);
document.getElementById('dComp').value=c.toISOString().split('T')[0];

var E=${ERRORS_JSON};

var SV=[
{l:"Category A",d:"Circumstances that have the capacity to cause error",j:"Classified as NCC MERP Category A: error-prone condition identified proactively. No actual error occurred but preventive action is warranted."},
{l:"Category B",d:"An error occurred but did not reach the patient",j:"Classified as NCC MERP Category B: error was intercepted before reaching the patient. The pharmacy/nursing screening served as an effective safety barrier."},
{l:"Category C",d:"Error reached patient but caused no harm",j:"Classified as NCC MERP Category C: error reached the patient without causing harm. Corrective action required to prevent future occurrences."},
{l:"Category D",d:"Error required monitoring to confirm no harm",j:"Classified as NCC MERP Category D: error reached the patient and required additional monitoring. Enhanced corrective action warranted."},
{l:"Category E",d:"Temporary harm requiring intervention",j:"Classified as NCC MERP Category E: error contributed to temporary harm requiring clinical intervention. Comprehensive RCA and robust corrective actions mandated."},
{l:"Category F",d:"Temporary harm requiring hospitalization",j:"Classified as NCC MERP Category F: error caused temporary harm requiring hospitalization. Sentinel event requiring comprehensive investigation."},
{l:"Category G",d:"Permanent patient harm",j:"Classified as NCC MERP Category G: sentinel event with permanent harm. Immediate MOH reporting required."},
{l:"Category H",d:"Life-sustaining intervention required",j:"Classified as NCC MERP Category H: sentinel event. Immediate MOH reporting within 24 hours required."},
{l:"Category I",d:"Contributed to patient death",j:"Classified as NCC MERP Category I: sentinel event. Immediate MOH reporting and comprehensive investigation mandated."}
];

function V(id){return document.getElementById(id).value.trim()}
function fD(d){if(!d)return'';var x=new Date(d),m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return m[x.getMonth()]+' '+x.getDate()+', '+x.getFullYear()}
function dD(d){if(!d)return'';var x=new Date(d);return x.getDate()+'-'+(x.getMonth()+1)+'-'+x.getFullYear()}

function generateRCA(){
var btn=document.getElementById('gBtn');btn.disabled=true;
document.getElementById('ov').classList.add('show');
setTimeout(function(){try{buildPDF()}catch(e){alert('Error: '+e.message);console.error(e)}finally{document.getElementById('ov').classList.remove('show');btn.disabled=false}},200);
}

function buildPDF(){
var t=E[parseInt(V('eType'))],sv=SV[parseInt(V('sev'))];
var pn=V('pName'),mrn=V('mrn'),age=V('age'),gen=V('gender'),ward=V('ward'),cc=V('cc');
var meds=V('meds'),notes=V('notes'),resp=V('resp')||'Medical Director';
var gw=gen==='male'?'male':'female';
var desc=t.d.replace(/\\[M\\]/g,meds);
var what='A '+age+'-year-old '+gw+' patient (MRN: '+mrn+') presented to '+ward+' with '+cc+'. The attending physician/staff '+desc+'.'+(notes?' '+notes:'');

var jsPDF=window.jspdf.jsPDF;
var doc=new jsPDF({unit:'mm',format:'a4'});
var W=210,M=14,CW=W-2*M,y=M;
var blue=[3,105,161],dk=[12,74,110],gr=[26,122,58],red=[176,48,48];

doc.setFontSize(14);doc.setTextColor(blue[0],blue[1],blue[2]);doc.setFont('helvetica','bold');
doc.text('Root Cause Analysis Report',M,y+8);
doc.setFontSize(8);doc.setTextColor(100);doc.setFont('helvetica','normal');
doc.text('Medication Safety Department - Quality Management Division - Aseer Health Cluster',M,y+13);
y+=18;doc.setDrawColor(blue[0],blue[1],blue[2]);doc.setLineWidth(0.8);doc.line(M,y,W-M,y);y+=3;
doc.setFontSize(7);doc.setTextColor(130);
doc.text('Doc ID: RCA-'+mrn+' | CBAHI: '+t.cb+' | Confidential',W-M,y,{align:'right'});y+=5;

function secHead(title){
if(y>255){doc.addPage();y=M;}
doc.setFillColor(blue[0],blue[1],blue[2]);doc.rect(M,y,CW,6,'F');
doc.setFontSize(9);doc.setTextColor(255);doc.setFont('helvetica','bold');
doc.text(title,W/2,y+4.2,{align:'center'});y+=8;doc.setTextColor(0);
}

function addRow(label,value,yesno){
if(y>268){doc.addPage();y=M;}
var lw=52,vw=CW-lw-(yesno!==undefined?18:0);
doc.setFontSize(7.5);doc.setFont('helvetica','bold');doc.setTextColor(30);
var lL=doc.splitTextToSize(label,lw-4);doc.text(lL,M+2,y+3.5);
if(yesno!==undefined){doc.setFont('helvetica','normal');doc.setFontSize(7);doc.setTextColor(gr[0],gr[1],gr[2]);doc.text(yesno?'[Y] Yes  No':'Yes  No [Y]',M+lw+2,y+3.5);}
doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(40);
var vx=M+lw+(yesno!==undefined?18:0)+2;
var vL=doc.splitTextToSize(value,vw-4);doc.text(vL,vx,y+3.5);
var rh=Math.max(lL.length,vL.length)*3.2+2.5;
doc.setDrawColor(180);doc.setLineWidth(0.15);doc.line(M,y+rh,W-M,y+rh);y+=rh+0.5;
}

function addTitle(title){
if(y>260){doc.addPage();y=M;}
doc.setFontSize(10);doc.setTextColor(blue[0],blue[1],blue[2]);doc.setFont('helvetica','bold');
doc.text(title,M,y+3);doc.setDrawColor(blue[0],blue[1],blue[2]);doc.setLineWidth(0.4);
doc.line(M,y+4.5,W-M,y+4.5);y+=7;
}

doc.autoTable({startY:y,margin:{left:M,right:M},
head:[[V('rcaType')+' Root Cause Analysis','Date Initiated: '+fD(V('dInit')),'Date Completed: '+fD(V('dComp'))]],
body:[['Patient: '+pn,'MRN: '+mrn,'Ward: '+ward],['Error Reached Patient: '+V('erReach'),'Error Type: '+t.l,'Severity: '+sv.l]],
styles:{fontSize:7.5,cellPadding:2.5,font:'helvetica'},headStyles:{fillColor:blue,textColor:255,fontStyle:'bold',fontSize:8},theme:'grid'});
y=doc.lastAutoTable.finalY+3;

secHead('SECTION 1: EVENT DESCRIPTION');
addRow('What happened?',what);
addRow('When?',fD(V('iDate'))+', '+(V('iTime')||'N/A')+'H, '+V('shift')+' shift');
addRow('Prior context','Patient presented to '+ward+' with '+cc+'. Department experiencing moderate-to-elevated patient volume.');
addRow('Location',ward+' Department');
addRow('Personnel',ward+' Attending Physician / Pharmacy Staff / Nursing Staff');
addRow('Reporting','Occurrence Variance Report (OVR) and Medication Error Incident Report per MOH/MSPP/0007/01');

secHead('SECTION 2: CAUSAL FACTOR ANALYSIS');
addRow('Human factors','1. Knowledge deficit regarding '+t.p+' and CBAHI ('+t.cb+')\\n2. Cognitive overload due to high patient volume\\n3. Communication barriers in multicultural environment\\n4. Habitual shortcuts in medication use workflow');
addRow('Training gaps',t.p+' requirements and CBAHI '+t.cb+' not adequately covered in orientation/CME. Periodic reinforcement not systematically embedded.',true);
addRow('Competence','Gap in medication safety competencies specific to '+t.l.toLowerCase()+'. Competency assessments should test compliance with this policy domain.',true);
addRow('Communication','Interdisciplinary communication insufficient to prevent/detect error. SBAR handoffs for medication communication require reinforcement.',true);
addRow('Staffing','Staffing levels within acceptable parameters at time of incident.',false);

secHead('SECTION 3: PROCESS AND SYSTEMS');
addRow('Process failure','Critical failure at medication use process step where '+t.l.toLowerCase()+' occurs. Current workflow lacks adequate safeguards.',true);
addRow('Safeguards','Current safeguards insufficient. Enhanced controls including automated validation and independent verification recommended.',false);

secHead('SECTION 4: INFORMATION AND ENVIRONMENT');
addRow('Info management','Required documentation incomplete or not verified. Systems do not enforce mandatory field completion.',true);
addRow('Equipment','Absence of electronic systems with built-in safety validations. Form limitations and intermittent labeling unavailability.',true);
addRow('Policy',t.p+' established per CBAHI '+t.cb+'. Compliance monitoring and enforcement insufficient.',true);

addTitle('FORMAL RECOMMENDATIONS');
doc.autoTable({startY:y,margin:{left:M,right:M},
head:[['#','Category','Recommendation']],
body:[['1','Education','Conduct mandatory CME for '+ward+' staff on '+t.p+' within 14 days. Include CBAHI '+t.cb+', MOH requirements, case-based examples. Documented attendance and competency assessment required.'],
['2','Process','Redesign workflow with mandatory verification checkpoints specific to preventing '+t.l.toLowerCase()+'. Evaluate CPOE/BCMA/eMAR with built-in validation.'],
['3','Governance','Establish quality dashboard reported monthly to PT&C with KPIs: compliance rate, incident rate, corrective action status.']],
styles:{fontSize:7,cellPadding:2,font:'helvetica',overflow:'linebreak'},headStyles:{fillColor:dk,textColor:255,fontStyle:'bold'},
columnStyles:{0:{cellWidth:8,halign:'center'},1:{cellWidth:18,fontStyle:'bold'}},theme:'grid'});
y=doc.lastAutoTable.finalY+3;

addTitle('ROOT CAUSE AND ACTION PLAN');
doc.autoTable({startY:y,margin:{left:M,right:M},
head:[['Root Cause','Risk Reduction Strategies','Responsible','Date']],
body:[[{content:t.r,rowSpan:3},'1. Mandatory staff education on '+t.p+' with competency verification within 14 days.',{content:resp,rowSpan:3},{content:fD(V('dComp')),rowSpan:3}],
['2. Workflow redesign with verification checkpoints. Enhanced forms/technology within 30 days.'],
['3. Monthly compliance audit with PT&C reporting. First audit at 60 days.']],
styles:{fontSize:7,cellPadding:2,font:'helvetica',overflow:'linebreak'},headStyles:{fillColor:dk,textColor:255,fontStyle:'bold'},
columnStyles:{0:{cellWidth:45},2:{cellWidth:22,halign:'center'},3:{cellWidth:22,halign:'center'}},theme:'grid'});
y=doc.lastAutoTable.finalY+3;

addTitle('NCC MERP SEVERITY');
if(y>265){doc.addPage();y=M;}
doc.setFillColor(224,240,232);doc.roundedRect(M,y,CW,8,1,1,'F');
doc.setFontSize(8);doc.setTextColor(gr[0],gr[1],gr[2]);doc.setFont('helvetica','bold');
doc.text(sv.l+' - '+sv.d,M+4,y+5);y+=10;
doc.setFontSize(7);doc.setTextColor(40);doc.setFont('helvetica','normal');
var jL=doc.splitTextToSize('Justification: '+sv.j,CW);doc.text(jL,M,y);y+=jL.length*3+2;

addTitle('CORRECTIVE ACTION PLAN');
var ap='Immediate (72hrs): Distribute memorandum to '+resp+' and '+ward+' staff on '+t.p+' requirements. Short-term (14 days): Mandatory CME with competency verification. Medium-term (30 days): Workflow redesign with verification checkpoints. Sustained: Monthly audits, quarterly PT&C reporting, annual policy review per CBAHI cycle.';
doc.setFontSize(7.5);doc.setTextColor(40);doc.setFont('helvetica','normal');
var aL=doc.splitTextToSize(ap,CW);if(y+aL.length*3>270){doc.addPage();y=M;}
doc.text(aL,M,y);y+=aL.length*3+4;

addTitle('ISHIKAWA (FISHBONE) DIAGRAM');
doc.autoTable({startY:y,margin:{left:M,right:M},
head:[['MANPOWER','METHOD','MATERIAL','ENVIRONMENT']],
body:[[t.fh.join('\\n'),t.fm.join('\\n'),t.ft.join('\\n'),t.fe.join('\\n')]],
foot:[[{content:'MEDICATION ERROR: '+t.l+' - '+t.p+' Non-Compliance',colSpan:4,styles:{halign:'center',textColor:red,fontStyle:'bold',fillColor:[255,245,245]}}]],
styles:{fontSize:6.5,cellPadding:2,font:'helvetica',overflow:'linebreak'},
headStyles:{fillColor:blue,textColor:255,fontStyle:'bold',halign:'center',fontSize:7},theme:'grid'});
y=doc.lastAutoTable.finalY+4;

if(y>240){doc.addPage();y=M;}
addTitle('AUTHORIZATION AND SIGNATURES');
doc.autoTable({startY:y,margin:{left:M,right:M},
body:[[{content:'Prepared by:\\n'+V('s1')+'\\n'+V('s1r'),styles:{fontStyle:'bold'}},{content:'Reviewed by:\\n'+V('s2')+'\\nPharmacy Manager',styles:{fontStyle:'bold'}}],
[V('s3')+'\\nPharmacy Quality Coordinator',V('s4')+'\\nDirector, Quality Management'],
[{content:V('s5')+'\\nMedical Director and Chairman PT&C',colSpan:2,styles:{halign:'center',fontStyle:'bold'}}]],
styles:{fontSize:7.5,cellPadding:3,font:'helvetica'},theme:'grid'});
y=doc.lastAutoTable.finalY+4;

doc.setFontSize(7);doc.setTextColor(120);
doc.text('Date: '+dD(V('dComp'))+' | Aseer Health Cluster - Medication Safety Program | Confidential',W/2,y+2,{align:'center'});

doc.save('RCA_'+mrn+'_'+fD(V('iDate')).replace(/[, ]+/g,'_')+'.pdf');
}
<\/script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('Generated index.html (' + html.length + ' chars)');
