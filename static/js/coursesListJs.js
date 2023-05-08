let coursesDataTable =document.querySelector('.coursesDataTable');
let coursesData =[];
let schedulesData =[];
let regCountData =[];
let regCount =[];
let FullCourses=[];
let regCoursesData=[];
//------------------------------fetch data-----------------------------

async function getData(){
data=await fetch("coursesData.json");
return data.json();
}
async function getSchedulesData(){
data=await fetch("schedulesData.json");
return data.json();
}
async function getRegCountData(){
data=await fetch("regCount.json");
return data.json();
}
async function getRegCoursesData(){
data=await fetch("regsData.json");
return data.json();
}
(async()=>{
const arr= await getData();
coursesData=arr.rows;
const arr2=await getSchedulesData();
schedulesData = arr2.rows;
const arr3=await getRegCountData();
regCountData = arr3.regs;
const arr4=await getRegCoursesData();
regCoursesData= arr4.rows;
console.log(regCoursesData);
await calcNumReg();
await displayData(coursesData);
})();

//------------------------------end fetch data-----------------------------

//------------------------------calc number reg for every course-----------------------------
async function calcNumReg(){
count = 0;

for (let index = 0; index < coursesData.length; index++) {
    for (let x = 0; x < regCountData.length; x++) {
        if (regCountData[x].coursed==coursesData[index].id) {
            count++;
        }
    }
    let y={
        coursesId:coursesData[index].id,
        num:count
    }
    regCount.push(y);
    count=0;
}
}
//------------------------------end calc-----------------------------

//------------------------------disabled add full course -----------------------------
function disabledFull(){
for (let index = 0; index < regCount.length; index++) {
    
        if (coursesData[index].capacity==regCount[index].num) {
            FullCourses.push(coursesData[index].id);
        }
        
    
}
}
//------------------------------end disabled add full course-----------------------------

//------------------------------disabled add Clash courses -----------------------------
function disabledClash (course){
    isInSameTime=false;
    let index = 0;
    for (; index < regCoursesData.length; index++) {
        for (let y = 0; y < coursesData.length; y++) {
            if(coursesData[y].id==regCoursesData[index].coursed){
                if(coursesData[y].schedul==course.schedul){
                    isInSameTime=true;
                }
            }
        }   
    }
    return isInSameTime;
}
//------------------------------end disabled add Clash courses-----------------------------

//------------------------------display data-----------------------------

async function displayData(apperData){
disabledFull();
isInSameTime=false;
let full=false;
let dontTakePrerequisites=false;
let dataToTable = '';
let idPrerequisites='';
for (let index = 0; index < apperData.length; index++) {
    isInSameTime= disabledClash(apperData[index]);
    for (let x = 0; x < FullCourses.length; x++) {
        if(FullCourses[x]==apperData[index].id)
        {
            full=true;
            break;
        }
    }
    if(apperData[index].prerequisites!=null){
        dontTakePrerequisites=true;
        let a = 0;
        for (; a < apperData.length; a++) {
            if(apperData[index].prerequisites==apperData[a].code)
            {
                idPrerequisites=apperData[a].id;
                break;
            }
        }
        for (let z = 0; z < regCoursesData.length; z++) {
            if(regCoursesData[z].coursed==idPrerequisites)
            {
                dontTakePrerequisites=false;
                break;
            }
        }
    }
    if(full||dontTakePrerequisites||isInSameTime){
        dataToTable=dataToTable+`
        <tr class='row'>
            <th class='col needtowrap'>${apperData[index].id}</th>
            <td class='col needtowrap'>${apperData[index].code}</td>
            <td class='col-3 needtowrap'>${apperData[index].name}</td>
            <td class='col-3 needtowrap'>${apperData[index].instructor}</td>
            <td class='col-3 needtowrap'>
                <button class="btn btn-outline-dark"  onclick='displayDetails(${index})'>Details</button>
                <button class="btn btn-dark mt-1" disabled>Add</button>
            </td>
        </tr>
    `;
}
else
{
    dataToTable=dataToTable+`
        <tr class='row'>
            <th class='col needtowrap'>${apperData[index].id}</th>
            <td class='col needtowrap'>${apperData[index].code}</td>
            <td class='col-3 needtowrap'>${apperData[index].name}</td>
            <td class='col-3 needtowrap'>${apperData[index].instructor}</td>
            <td class='col-3 needtowrap position-relative'>
                <button class="btn btn-outline-dark"  onclick='displayDetails(${index})'>Details</button>
                <button class="btn btn-dark mt-1 " onclick='addCourse(${apperData[index].id})'>Add</button>
            </td>
        </tr>
    `;
}
dontTakePrerequisites=false;
idPrerequisites='';
full=false;
}
    
coursesDataTable.innerHTML=dataToTable;

}
//------------------------------srarch------------------------------
let searchInstructor = document.getElementById('searchInstructor');
let searchName = document.getElementById('searchName');
let searchCode = document.getElementById('searchCode');
searchCode.addEventListener('keyup',function(){
let dataApper=[];
for (let index = 0; index < coursesData.length; index++) {
    if(coursesData[index].code.toString().includes(searchCode.value))
        dataApper.push(coursesData[index]);
}
displayData(dataApper);
})
searchName.addEventListener('keyup',function(){
let dataApper=[];
for (let index = 0; index < coursesData.length; index++) {
    if(coursesData[index].name.includes(searchName.value.toLowerCase()))
        dataApper.push(coursesData[index]);
}
displayData(dataApper);
})
searchInstructor.addEventListener('keyup',function(){
let dataApper=[];
for (let index = 0; index < coursesData.length; index++) {
    if(coursesData[index].instructor.toLowerCase().includes(searchInstructor.value.toLowerCase()))
        dataApper.push(coursesData[index]);
}
displayData(dataApper);
})
//------------------------------end search-----------------------------
//------------------------------details-----------------------------
function displayDetails(index){
let x=0;
$('.modal').css('display','block');
document.querySelector('.modal-title').innerHTML=coursesData[index].name;
document.querySelector('.modalCode').innerHTML=`code: ${coursesData[index].code}.`;
if(coursesData[index].description==null)
    document.querySelector('.modalDescription').innerHTML=`Description: No Description :( .`;
else
    document.querySelector('.modalDescription').innerHTML=`Description: ${coursesData[index].description}.`;
document.querySelector('.modalInstructor').innerHTML=`Instructor: ${coursesData[index].instructor}.`;
if(coursesData[index].prerequisites==null)
    document.querySelector('.modalPrerequisites').innerHTML=`Prerequisites: No Prerequisites :) .`;
else
    document.querySelector('.modalPrerequisites').innerHTML=`Prerequisites: ${coursesData[index].prerequisites}.`;
for (; x < schedulesData.length; x++) {
    if(coursesData[index].schedul==schedulesData[x].id)
        break;
}
document.querySelector('.modalDays').innerHTML=`Days: ${schedulesData[x].days}.`;
document.querySelector('.modalTime').innerHTML=`Time: ${schedulesData[x].startTime} - ${schedulesData[x].endTime}.`;
document.querySelector('.modalRoom').innerHTML=`Room: ${schedulesData[x].room}.`;
document.querySelector('.modalCapacity').innerHTML=`Capacity: ${regCount[index].num}/${coursesData[index].capacity}.`;

}
//------------------------------end details-----------------------------

function addCourse(courseId){
    window.location = "addCourse/"+String(courseId);    
}