import{S as B,T as E}from"./Header-a849e12e.js";import{_ as R,o as h,c as b,a as s,i as L,j as P,k as _,r as G,d as a,e,f as t,g as H,m as O,p as W,b as M}from"./index-c39ef441.js";const J={data(){return{previewImage:null}},methods:{handleDrop(i){i.preventDefault();const o=i.dataTransfer.files[0];if(o&&o.type.startsWith("image/")){const d=new FileReader;d.onload=()=>{this.previewImage=d.result},d.readAsDataURL(o)}},triggerFileInput(){this.$refs.fileInput.click()},handleFileSelect(i){const o=i.target.files[0];if(o&&o.type.startsWith("image/")){const d=new FileReader;d.onload=()=>{this.previewImage=d.result},d.readAsDataURL(o)}},uploadImage(){console.log("上傳圖片:",this.previewImage)}}},K={class:"out col-12"},Q={class:"preViewSide"},X=["src"];function Y(i,o,d,g,x,m){return h(),b("div",K,[s("div",{class:"dragArea shadow-sm",onDragover:o[1]||(o[1]=P(()=>{},["prevent"])),onDrop:o[2]||(o[2]=(...u)=>m.handleDrop&&m.handleDrop(...u)),onClick:o[3]||(o[3]=(...u)=>m.triggerFileInput&&m.triggerFileInput(...u))},[s("div",Q,[x.previewImage?(h(),b("img",{key:0,src:x.previewImage,alt:"Preview"},null,8,X)):L("",!0)]),s("input",{ref:"fileInput",type:"file",style:{display:"none"},onChange:o[0]||(o[0]=(...u)=>m.handleFileSelect&&m.handleFileSelect(...u))},null,544)],32)])}const y=R(J,[["render",Y],["__scopeId","data-v-daf712ff"]]);const A=i=>(W("data-v-b267283c"),i=i(),M(),i),Z={key:0},ee={key:1},te=A(()=>s("i",{class:"vxe-icon-edit"},null,-1)),oe=A(()=>s("h6",null,"請雙擊欄位以啟用編輯模式",-1)),le={class:"row justify-content-between p-3"},ne={__name:"TravelTable",setup(i){const o=_([]),d=_([]),g=_(!1),x=_([]),m=_(),u=_(),S=_(),I=_(!1),N=(p,n)=>new Promise(f=>{setTimeout(()=>{const c=[{HotelId:"SH00001",HotelName:"快樂寵物旅館",Info:!0,Address:"新北市三峽區大學路126號",RoomType:"狗套房,貓套房",RomeSet:"衛生,冷氣,監控,濕度,濾水器",Comment:"歡迎寵物入住，環境舒適，設施齊全。"},{HotelId:"SH00002",HotelName:"狗狗假期",Info:!1,Address:"台北市中山區中山北路100號",RoomType:"狗套房",RomeSet:"衛生,冷氣",Comment:"專業照顧狗狗，提供優質住宿環境。"},{HotelId:"SH00003",HotelName:"貓咪天地",Info:!0,Address:"新竹市東區光復路200號",RoomType:"貓套房",RomeSet:"監控,濕度",Comment:"寵物貓專屬的度假天堂，您的貓會愛上這裡。"},{HotelId:"SH00004",HotelName:"寵物樂園",Info:!1,Address:"台中市西區中興街50號",RoomType:"狗套房,貓套房",RomeSet:"濾水器",Comment:"讓寵物在這裡玩得開心，是最好的選擇。"},{HotelId:"SH00005",HotelName:"愛心寵物屋",Info:!0,Address:"高雄市左營區博愛路300號",RoomType:"狗套房,貓套房",RomeSet:"衛生,濕度,玩具",Comment:"我們以愛心照顧每一隻寵物，讓牠們感受到家的溫馨。"},{HotelId:"SH00006",HotelName:"快樂動物城",Info:!1,Address:"台南市中西區民權路10號",RoomType:"狗套房,貓套房",RomeSet:"衛生,冷氣,監控",Comment:"動物王國，讓寵物們過上快樂的生活。"},{HotelId:"SH00007",HotelName:"愛寵家園",Info:!0,Address:"基隆市安樂區和一路500號",RoomType:"狗套房",RomeSet:"衛生,冷氣,濕度,濾水器,玩具",Comment:"這裡是您寵物的第二個家，期待與您見面。"},{HotelId:"SH00008",HotelName:"小動物樂園",Info:!1,Address:"桃園市中壢區中大路800號",RoomType:"貓套房",RomeSet:"衛生,濕度",Comment:"專為小動物打造的樂園，讓牠們玩得盡興。"},{HotelId:"SH00009",HotelName:"寵物夢想家",Info:!0,Address:"新竹縣竹北市文化路20號",RoomType:"狗套房,貓套房",RomeSet:"冷氣,監控,濕度,濾水器,食物供應",Comment:"我們的目標是實現您和寵物的夢想，一同共創美好回憶。"},{HotelId:"SH00010",HotelName:"歡樂寵物園",Info:!1,Address:"彰化縣彰化市成功路100號",RoomType:"貓套房",RomeSet:"冷氣,監控,濿水器",Comment:"在這裡，每一個寵物都能找到屬於自己的快樂。"}];f({page:{total:c.length},result:c.slice((p-1)*n,p*n)})},100)}),$=G({border:!0,height:600,rowConfig:{keyField:"id"},columnConfig:{resizable:!0},checkboxConfig:{reserve:!0},pagerConfig:{enabled:!0,pageSize:10},exportConfig:{},columns:[{field:"HotelId",title:"旅宿編號"},{field:"HotelName",title:"旅宿名稱"},{field:"Info",title:"上架狀態",slots:{default:"view"}},{field:"",title:"上/下架",slots:{default:"edit"},align:"center"},{field:"",title:"編輯",slots:{default:"icon"},align:"center"}],toolbarConfig:{slots:{buttons:"toolbar_buttons",tools:"toolbar_tools"},export:{icon:"vxe-icon-cloud-download"},zoom:{iconIn:"vxe-icon-fullscreen",iconOut:"vxe-icon-minimize"},refresh:{icon:"vxe-icon-refresh",iconLoading:"vxe-icon-refresh roll"}},proxyConfig:{seq:!0,props:{result:"result",total:"page.total"},ajax:{query:({page:p})=>N(p.currentPage,p.pageSize)}}}),D=p=>{x.value=["HotelId","HotelName","Address","RoomType","RomeSet","Comment"].map(n=>({label:n,value:p[n]})),S.value=p,g.value=!0},U=()=>{I.value=!0};return(p,n)=>{const f=a("vxe-input"),c=a("vxe-button"),r=a("vxe-form-item"),C=a("vxe-form"),z=a("vxe-switch"),F=a("vxe-grid"),T=a("vxe-column"),j=a("vxe-table"),V=a("vxe-modal"),v=a("vxe-checkbox"),k=a("vxe-checkbox-group"),q=a("vxe-textarea");return h(),b("div",null,[e(F,O({ref_key:"xGrid",ref:u},$),{toolbar_buttons:t(()=>[e(f,{type:"text",placeholder:"請輸入名稱"}),e(c,{status:"primary"},{default:t(()=>[H("查詢")]),_:1}),e(c,{icon:"vxe-icon-square-plus",onClick:n[0]||(n[0]=l=>U())},{default:t(()=>[H("新增旅宿")]),_:1})]),toolbar_tools:t(()=>[e(C,null,{default:t(()=>[e(r,null,{default:t(()=>[s("template",null,[e(f,{type:"text",placeholder:"請输入名稱"})])]),_:1}),e(r,null,{default:t(()=>[s("template",null,[e(c,{type:"submit",status:"primary",content:"查詢"}),e(c,{type:"reset",content:"重置"})])]),_:1})]),_:1})]),view:t(({row:l})=>[l.Info===!1?(h(),b("span",Z,"已下架")):(h(),b("span",ee,"上架中"))]),edit:t(({row:l})=>[e(z,{modelValue:l.Info,"onUpdate:modelValue":w=>l.Info=w},null,8,["modelValue","onUpdate:modelValue"])]),icon:t(({row:l})=>[e(c,{onClick:w=>D(l),circle:""},{default:t(()=>[te]),_:2},1032,["onClick"])]),_:1},16),e(V,{modelValue:g.value,"onUpdate:modelValue":n[1]||(n[1]=l=>g.value=l),title:"旅宿詳情",width:"600",height:"500","show-footer":""},{default:t(()=>[oe,e(j,{border:"inner","auto-resize":"","show-overflow":"",height:"auto",ref_key:"xTable",ref:m,"row-config":{isHover:!0},"show-header":!1,"sync-resize":g.value,"edit-config":{trigger:"dblclick",mode:"cell"},data:x.value},{default:t(()=>[e(T,{field:"label",width:"25%"}),e(T,{field:"value","edit-render":{}},{edit:t(({row:l})=>[e(f,{modelValue:l.value,"onUpdate:modelValue":w=>l.value=w,type:"text",placeholder:"{ row }"},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["sync-resize","data"])]),_:1},8,["modelValue"]),e(V,{title:"新增旅宿",modelValue:I.value,"onUpdate:modelValue":n[4]||(n[4]=l=>I.value=l),width:"1000",resize:"","destroy-on-close":""},{default:t(()=>[e(C,null,{default:t(()=>[e(r,{title:"旅宿基本資料","title-align":"left","title-width":200,span:24,"title-prefix":{icon:"vxe-icon-comment"}}),e(r,{field:"name",title:"旅宿名稱:",span:12,"item-render":{}},{default:t(()=>[e(f,{placeholder:"請輸入旅宿名稱"})]),_:1}),e(r,{field:"Address",title:"旅宿地址:",span:12,"item-render":{}},{default:t(()=>[e(f,{placeholder:"請輸入地址"})]),_:1}),e(r,{field:"RomeType",title:"房型:",span:12,"item-render":{}},{default:t(()=>[e(k,{modelValue:o.value,"onUpdate:modelValue":n[2]||(n[2]=l=>o.value=l)},{default:t(()=>[e(v,{label:"1",content:"狗套房"}),e(v,{label:"2",content:"貓套房"})]),_:1},8,["modelValue"])]),_:1}),e(r,{field:"RomeSet",title:"設施:",span:12,"item-render":{}},{default:t(()=>[e(k,{modelValue:d.value,"onUpdate:modelValue":n[3]||(n[3]=l=>d.value=l)},{default:t(()=>[e(v,{label:"1",content:"衛生"}),e(v,{label:"2",content:"冷氣"}),e(v,{label:"3",content:"監控"}),e(v,{label:"4",content:"濕度"}),e(v,{label:"5",content:"濾水器"})]),_:1},8,["modelValue"])]),_:1}),e(r,{field:"RomeSet",title:"旅宿環境:",span:24}),e(r,{span:24},{default:t(()=>[s("div",le,[e(y),e(y),e(y),e(y),e(y)])]),_:1}),e(r,{title:"旅館簡介","title-align":"left","title-width":200,span:24,"title-prefix":{message:"請注意字數不得超過125字",icon:"vxe-icon-info-circle-fill"}}),e(r,{field:"Comment",span:24,"item-render":{}},{default:t(()=>[e(q,{autosize:{minRows:4,maxRows:7},"show-word-count":!0,placeholder:"請輸入...",maxlength:125})]),_:1}),e(r,{align:"center","title-align":"left",span:24},{default:t(()=>[e(c,{type:"submit"},{default:t(()=>[H("提交")]),_:1}),e(c,{type:"reset"},{default:t(()=>[H("重置")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}},ae=R(ne,[["__scopeId","data-v-b267283c"]]),se={components:{Sidebar:B,Top:E,TourTable:ae},data(){return{}}},de={class:"thispage"},re={class:"container mt-4"},ie=s("h2",null,"旅宿管理",-1),ce={class:"card shadow-lg mt-4"},me=s("div",{class:"card-header"},[s("h5",null,"旅宿列表")],-1),ue={class:"card-body"};function pe(i,o,d,g,x,m){const u=a("sidebar"),S=a("top"),I=a("tour-table");return h(),b("div",de,[e(u),s("div",null,[e(S),s("div",re,[ie,s("div",ce,[me,s("div",ue,[e(I)])])])])])}const ve=R(se,[["render",pe]]);export{ve as default};