const qBank = [
 
  {
    question: "1.มีไข้สูง 37.5 องศา (Celsius) ขึ้นไป หรือ รู้สึกว่ามีไข้",
    answers: ["ต่ำกว่า 37.5", "สูงกว่าหรือเท่ากับ 37.5 องศาเซลเซียส"],
    correct: "สูงกว่าหรือเท่ากับ 37.5 องศาเซลเซียส",
    Id: "3893585"
  },
  {
    question: '2.มีอาการอย่างหนึ่งในนี้ ( ไอ เจ็บคอ หอบเหนื่อยผิดปกติ มีน้ำมูก จาม ครั่นเนื้อครั่นตัว )',
    answers: ["มี", "ไม่มี"],
    correct: "มี",
    Id: "3913430"
  },
  {
    question: "3.มีประวัติเดินทางไปประเทศกลุ่มเสี่ยงหรือพื้นที่เสี่ยงตามประกาศกรมในช่วง 14 วันก่อน (ตรวจสอบได้ที่นี่)",
    answers: ["มี", "ไม่มี"],
    correct: "มี",
    Id: "4049121"
  },
  {
    question:"4.มีประวัติอยู่ใกล้ชิดกับผู้ป่วยยืนยัน COVID-19 (ใกล้กว่า 1 เมตร นานเกิน 5 นาที)ในช่วง 14 วันก่อน หรือ ไปสนามมวยลุมพินี หรือ ผับที่มีการพบผู้ติดเชื้อคุณเคยร่วมเดินทางกับผู้ป่วยโควิดหรือไม่",
    answers: ["มี", "ไม่มี"],
    correct: "มี",
    Id: "4150746"
  },
  {
    question:"5.มีบุคคลในบ้านเดินทางไปประเทศกลุ่มเสี่ยงหรือพื้นที่เสี่ยงตามประกาศกรมในช่วง 14 วันก่อน (ตรวจสอบได้ที่นี่)",
    answers: ["มี", "ไม่มี"],
    correct: "มี",
    Id: "4235063"
  },
  {
    question:"6.มีผู้ใกล้ชิดป่วยเป็นไข้หวัดพร้อมกัน มากกว่า 5 คน ในช่วง 14 วันก่อน",
    answers: ["มี", "ไม่มี"],
    correct: "มี",
    Id: "4235044"
  },
  {
    question:"7.เมื่อออกนอกบ้านท่านสวมใส่หน้ากากอนามัยทุกครั้งและตลอดเวลาพกแอลกอฮอลล์เจลติดตัวไปด้วยทุกครั้ง และล้างมือด้วยแอลกอฮอล์เจลที่พกไปบ่อยๆจะยืนห่างผู้อื่น 2 เมตร เสมอ",
    answers: ["ใช่", "ไม่ใช่"],
    correct: "ไม่ใช่",
    Id: "4235099"
  }
  

];

export default () =>
  Promise.resolve(qBank);
