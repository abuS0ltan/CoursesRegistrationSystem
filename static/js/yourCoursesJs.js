let coursesDataTable =document.querySelector('.coursesDataTable');

//------------------------------fetch data-----------------------------
let coursesData =[];
let schedulesData =[];
let regsData =[];
let apperData=[];
async function getData(){
data=await fetch("coursesData.json");
return data.json();
}
async function getSchedulesData(){
data=await fetch("schedulesData.json");
return data.json();
}
async function getRegsData(){
data=await fetch("regsData.json");
console.log(data.json)
return data.json();
}
(async()=>{
const arr= await getData();
coursesData=arr.rows;
const arr2=await getSchedulesData();
schedulesData = arr2.rows;
const arr3=await getRegsData();
regsData = arr3.rows;
await displayData();
})();

//------------------------------end fetch data-----------------------------

function makeData(){
let apperData=[];
for (let index = 0; index < regsData.length; index++) {
    y=0;
    for ( y = 0; y < coursesData.length; y++) {
        console.log('hi');
        if(regsData[index].coursed==coursesData[y].id)
            break;
    }
    apperData.push(coursesData[y]);
}
return apperData;
}
async function displayData(){
let x=0;
apperData = makeData();
let dataToTable = '';
for (let index = 0; index < apperData.length; index++) {
    for (; x < schedulesData.length; x++) {
    if(apperData[index].schedul==schedulesData[x].id)
        break;
    }
    dataToTable=dataToTable+`
        <tr class="row">
                        <th class="col needtowrap">${index+1}</th  >
                        <td class="col needtowrap">${apperData[index].code}</td>
                        <td class="col-2 needtowrap">${apperData[index].name}</td  >
                        <td class="col-2 needtowrap"><p class=''>${schedulesData[x].days}</p></td  >
                        <td class="col-2 needtowrap">${schedulesData[x].startTime} - ${schedulesData[x].endTime}</td   >
                        <td class="col needtowrap">${schedulesData[x].room}</td>
                        <td class="col-3 needtowrap">
                            <div class="btn btn-outline-dark" onclick='displayDetails(${index})'>Details</div>
                        </td>

                    </td>
        `;
        x=0;
}
coursesDataTable.innerHTML=dataToTable;
}
//------------------------------details-----------------------------
function displayDetails(index){
let x=0
$('.modal').css('display','block');
document.querySelector('.modal-title').innerHTML=apperData[index].name;
document.querySelector('.modalCode').innerHTML=`code: ${apperData[index].code}.`;
if(apperData[index].description==null)
    document.querySelector('.modalDescription').innerHTML=`Description: No Description :( .`;
else
    document.querySelector('.modalDescription').innerHTML=`Description: ${apperData[index].description}.`;
document.querySelector('.modalInstructor').innerHTML=`Instructor: ${apperData[index].instructor}.`;
if(apperData[index].prerequisites==null)
    document.querySelector('.modalPrerequisites').innerHTML=`Prerequisites: No Prerequisites :) .`;
else
    document.querySelector('.modalPrerequisites').innerHTML=`Prerequisites: ${apperData[index].prerequisites}.`;
for (; x < schedulesData.length; x++) {
    if(apperData[index].schedul==schedulesData[x].id)
        break;
}
document.querySelector('.modalDays').innerHTML=`Days: ${schedulesData[x].days}.`;
document.querySelector('.modalTime').innerHTML=`Time: ${schedulesData[x].startTime} - ${schedulesData[x].endTime}.`;
document.querySelector('.modalRoom').innerHTML=`Room: ${schedulesData[x].room}.`;


}
//------------------------------end details-----------------------------