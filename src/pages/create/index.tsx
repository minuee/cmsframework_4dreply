/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState,useRef,useEffect} from 'react';
import {ContentHeader} from '@components';
import { useForm } from "react-hook-form";
import './index.css';
import { AiFillAppstore,AiFillStar,AiFillSignal,AiFillUnlock,AiFillAlert,AiOutlinePlus } from "react-icons/ai";

const companys = [
  {id:1,name:'Rinkeby',icon:'https://testnets.opensea.io/static/images/logos/ethereum.svg',desc:'An open-source blockchain that powers most NFT sales'},
  {id:2,name:'Mumbai',icon:'https://testnets.opensea.io/static/images/logos/polygon.svg',desc:'A high-speed, gas-free blockchain that works with Ethereum'},
  {id:3,name:'Baobab',icon:'https://testnets.opensea.io/static/images/logos/klaytn.svg',desc:'A global blockchain platform'},
  {id:4,name:'BSC TestNet',icon:'https://testnets.opensea.io/static/images/logos/bsc.png',desc:''}
]

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export interface inputTypes {
  supply: any | null;
  firstname: any | null;
  blockchain: number | 1;
  content: any | null;
  sw1: any | false;
  sw2: any | false;
  imgFile: any | null;
}

const Create = () => {

  const fileRef = useRef<any>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showCoins, setShowCoins] = useState<Boolean>(false);
  const [coinCompany, setCoinCompany] = useState<any>([]);
  const [selectCoinCompany, setSelectCoinCompany] = useState<any>(companys[0]);

  const [inputs, setInputs] = useState<inputTypes>({
    supply: null,    
    firstname : null,
    blockchain : 1,
    content : '',
    sw1 : false,
    sw2 : false,
    imgFile : null
})
  const [imgBase64, setImgBase64] = useState<string[]>([]); // 파일 base64
  const [imgFile, setImgFile] = useState<String>('');	//파일
  const [videoFile, setVideoFile] = useState<string>('');	//파일
  const [uploadFileType, setUploadFileType] = useState('image');	//파일


    useEffect(() => {
        setCoinCompany(companys.filter((sitem) =>  sitem.id !== inputs.blockchain))
        setSelectCoinCompany(companys[0])
    }, []);
  
    const onSubmit = (data:any) => console.log(data);

    const handleChange = (e:any) => {    
        console.log('handleChange',e.target.name,e.target.value)
        if ( e.target.name == 'sw1') {
            setInputs({
                ...inputs,
                sw1 : !inputs.sw1,
            });
        }else if ( e.target.name == 'sw2') {
            setInputs({
                ...inputs,
                sw2 : !inputs.sw2,
            });
        }else{
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    }

    const selectCoins = async( item:any) => {
        if ( item === inputs.blockchain) {
            console.log('if')
        }else{
            const selectCom = companys.filter((sitem) =>  sitem.id == item);
            setInputs({
                ...inputs,
                blockchain : item
            }); 
            setCoinCompany(companys.filter((sitem) =>  sitem.id !== item))
            setSelectCoinCompany(selectCom[0])
            setShowCoins(false)
        }
    }

    const handleChangeFile = (event:any) => {
        console.log('event.target.files', event.target.files[0].type);
        setImgBase64([]);
        setVideoFile("");
        setImgFile("");
        if ( event.target.files.length > 0 ) {
            if ( event.target.files[0].type.indexOf('video') != -1) {
                console.log('event.target.files video',event.target.files[0].type.indexOf('video'));
                setUploadFileType('video');        
                setVideoFile( URL.createObjectURL(event.target.files[0]) )
            }else if ( event.target.files[0].type.indexOf('image') != -1 ) {
                console.log('event.target.files image',event.target.files[0].type.indexOf('image'));
                setUploadFileType('image');
                setImgFile(event.target.files);
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onloadend = () => {
                    const base64 = reader.result;
                    console.log(base64);
                    if (base64) {
                        var base64Sub = base64.toString()
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                    }
                }
            }else{
            }
        }
    }

  return (
    <div>
      <ContentHeader title="Create Page" />
      <section className="content">
        <div className="mainset">
          <div className="mainWrap">
              <form onSubmit={handleSubmit(onSubmit)}>
              <p className="mainTitle">Create New Item</p>

              <p className="requiredText"><span className="redText">*</span> Reuired fields</p>

              <p className="menuText">
                  Image, Video, Audio or 3D Model
                  <span className="redText"> *</span> 
              </p>
              <p className="requiredText">
                  File types supported : JPG,PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF
                  Max Size : 100MB
              </p>

              <p className="imageWrap" onClick={() => fileRef.current.click()}>
              {
              ( uploadFileType == 'image' && imgBase64.length > 0 ) ?
                  imgBase64.map((item) => {
                      return(         
                          <img                  
                              src={item}
                              alt="image"
                              style={{width:"100%",height:'100%',objectFit:'cover'}}
                          />
                      )
                  })
              :
              ( uploadFileType == 'video' && videoFile != null ) ?
                  <video 
                      src={videoFile} 
                      muted={false} 
                      controls 
                      autoPlay={true}
                      loop
                      style={{ width: "100%", height: "100%"}}
                  />
              :
                  <img src="img/icon_photo.png" className='iconImage' />
              }            
              <input
                  ref={fileRef}
                  onChange={handleChangeFile}
                  multiple={false}
                  type="file"
                  hidden
              />
          </p>
          <p className="menuText mt20">
              Name<span className="redText"> *</span> 
          </p>
          <p className="inputWrap">
              <input
                  className="baseInput"
                  placeholder="Item name"              
              />
          </p>
          <p className="menuText mt20">
              Externam link
          </p>
          <p className="requiredText">
              OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it, You are welcome to link to your own webpage with more details
          </p>
          <p className="inputWrap">
              <input
                  className="baseInput"
                  placeholder="https://yoursite.io/item/124"
              />
          </p>
          <p className="menuText mt20">
              Description
          </p>
          <p className="requiredText">
              The description will be included on the item's detail page underneath its iamge, Markdown systax is supported.
          </p>
          <textarea
              className="baseTextarea"
              placeholder="Provide a detailed description of your item"
          />
          <p className="menuText mt20">
              Collection
          </p>
          <p className="requiredText">
              This is the collection where your item will appear.
          </p>
          <input
              className="baseInput"
              placeholder="Select collection"
          />          
          <div className='statsCommonWrap'>
              <span className="statsIconWrap">
                  <AiFillAppstore size={25} color={'#ffffff'} />
              </span>
              <span className="statsTitleWrap">
                  <span className="menuText">
                      Properties
                  </span>
                  <span className="menuTextS">
                      Textual traits that show up as rectangles
                  </span>
              </span>
              <span className="statsButtonWrap">
                  <span className="statsPlusButton">
                      <AiOutlinePlus size={25} color={'#ffffff'} />
                  </span>
              </span>
          </div>
          
          <div className='statsCommonWrap'>
              <span className="statsIconWrap">
                  <AiFillStar size={25} color={'skyblue'} />
              </span>
              <span className="statsTitleWrap">
                  <span className="menuText">
                      Level
                  </span>
                  <span className="menuTextS">
                      Numerical traits that just show as numbers
                  </span>
              </span>
              <span className="statsButtonWrap">
                  <span className="statsPlusButton">
                      <AiOutlinePlus size={25} color={'#ffffff'} />
                  </span>
              </span>
          </div>
          <div className='statsCommonWrap'>
              <span className="statsIconWrap">
                  <AiFillSignal size={25} color={'#ffffff'} />
              </span>
              <span className="statsTitleWrap">
                  <span className="menuText">
                      Stats
                  </span>
                  <span className="menuTextS">
                      Numerical traits that just show as numbers
                  </span>
              </span>
              <span className="statsButtonWrap">
                  <span className="statsPlusButton">
                      <AiOutlinePlus size={25} color={'#ffffff'} />
                  </span>
              </span>
          </div>
          <div className='statsCommonWrap'>
              <span className="statsIconWrap">
                  <AiFillUnlock size={25} color={'#895395'} />
              </span>
              <span className="statsTitleWrap">
                  <span className="menuText">
                      Unlockable Content
                  </span>
                  <span className="menuTextS">
                      Include unlockable content that can only be revealed by the owner of the item.
                  </span>
              </span>
              <span className="statsButtonWrap">            
                  <input
                      className="react-switch-checkbox"
                      id={`react-switch-new`}
                      type="checkbox"
                      name={'sw1'} value={inputs.sw1} onChange={handleChange}
                  />
                  {
                  inputs.sw1 ? 
                  <label
                      className="react-switch-label-on"
                      htmlFor={`react-switch-new`}
                  >
                      <span className={`react-switch-button`} />
                  </label>
                  :
                  <label
                      className="react-switch-label"
                      htmlFor={`react-switch-new`}
                  >
                      <span className={`react-switch-button`} />
                  </label>              
                  }
              </span>
          </div>
          {
              inputs.sw1 && (
              <div className='statsCommonWrap'>
                  <textarea
                      className="baseTextarea"
                      name="content"
                      onChange={handleChange}
                      placeholder="Enter content(access key, code to redeem, link to file,etc"
                  />
              </div>
              )
          }
          <div className='statsCommonWrap'>
              <span className="statsIconWrap">
                  <AiFillAlert size={25} color={'#ffffff'} />
              </span>
              <span className="statsTitleWrap">
                  <span className="menuText">
                      Explicit {"&"} Sensitive Content
                  </span>
                  <span className="menuTextS">
                      Set this item as explicit and sensitive content
                  </span>
              </span>
              <span className="statsButtonWrap">            
                  <input
                      className="react-switch-checkbox"
                      id={`react-switch-new`}
                      type="checkbox"
                      name={'sw2'} value={inputs.sw2} onChange={handleChange}
                  />
                  {
                      inputs.sw2 ? 
                      <label
                          className="react-switch-label-on"
                          htmlFor={`react-switch-new`}
                      >
                          <span className={`react-switch-button`} />
                      </label>
                      :
                      <label
                          className="react-switch-label"
                          htmlFor={`react-switch-new`}
                      >
                          <span className={`react-switch-button`} />
                      </label>              
                  }
              </span>
          </div>
          <p className="menuText mt20">
              Supply
          </p>
          <p className="requiredText">
              The number of items that can be minted. No gas cost to you!
          </p>
          <input
              type={'text'}
              className="baseInput"
              id="supply"
              name="supply"
              value={inputs.supply}          
              onChange={e => {
                  handleChange(e)
              }}          
          />
          {( errors.supply?.type === 'required') && (
              <span className='requiredError'>* This is required</span>
          )}
          <p className="menuText mt20">
              Blockchain
          </p>
          <div className='inputWrap'>
              <span className='fixedArrow' >
                  {
                  showCoins ?
                  <img src='img/btn_select_close.png' className='arrowIcon' />
                  :
                  <img src='img/btn_select_open.png' className='arrowIcon' />
                  }
              </span>
              <div 
                  className="baseInput addFlexRaw" 
                  onClick={() => setShowCoins(!showCoins)}
              >
                  <img src={selectCoinCompany.icon} className='coinIcon' />
                  <span className="coinTextWrap">
                      <span className="coinText">{selectCoinCompany.name}</span>
                  </span>
              </div>
          </div>
          <div className='companyWrap'>
              { 
                  showCoins  && (
                      coinCompany.map((item:any, index:number) => {
                          return (
                          <div 
                              key={index}
                              className="baseInput addFlexRaw" 
                              onClick={() => selectCoins(item.id)}
                          >
                              <img src={item.icon} className='coinIcon' />
                              <span className="coinTextWrap">
                                  <span className="coinText">
                                      {item.name}
                                      <span className="requiredText">{item.desc}</span>
                                  </span>
                              </span>
                          </div>
                          )
                      })
                  )
              }
          </div>
          <p className="menuText mt20">
              Freeze metadata
          </p>
          <p className="requiredText">
              Freesing your metadata will allow you to permanently lock and store all of this item's content in decentralized file storage.
          </p>
          <input          
              className="baseInput"
              placeholder='To Freeze your metadata, you must create your item first'          
          />
          <p className='liner' />
              <p className="sendButtonWrap">
              <button 
                  type='submit'
                  //disabled={true}
                  className='sendButton'
              >Create</button>
          </p>
      </form>  
      </div>
      </div>
      </section>
    </div>
  );
};

export default Create;
