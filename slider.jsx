import React,{useRef,useEffect,forwardRef,createRef} from 'react';
import {Box,Stack,PseudoBox,IconButton,Button,Image} from '@chakra-ui/core';
import {GrFormNext,GrFormPrevious} from 'react-icons/gr?size=32';

var sliderIndex = 0;
var autoSlideIndex =0;

const autoSlide=(refer)=>{
  refer.map((element)=>element.current.style.display="none");
  autoSlideIndex++;
  (autoSlideIndex>refer.length-1)?(autoSlideIndex = 0):(null);
  refer[autoSlideIndex].current.style.display="inline-block";
  return null;
}

const showSlides=(value,refer)=>{
  (value>refer.current.length-1)?(sliderIndex = 0):(null);
  (value<0)?(sliderIndex=refer.current.length-1):(null);
  refer.current.map((element)=>element.current.style.display="none");
  refer.current[sliderIndex].current.style.display="inline-block";
  return null;
}

const buttonClick=({value,refer})=>(showSlides(sliderIndex += value,refer));

const ImageSlides=forwardRef(({image},ref)=>(<PseudoBox ref={ref} display="none">
  <Image src={"https://via.placeholder.com/1005x368.png?text="+image}/></PseudoBox>));

const SliderNavigator=({icon,right,value,refer})=>(<IconButton variantColor="black" display="block" 
  pos="absolute" size="sm" top="50%" right={right}  icon={icon} onClick={()=> buttonClick({value,refer})}/>);


export default function Slider(){
 const divRef = useRef([]);
  divRef.current =[0,0].map((ref,index)=> divRef.current[index]=createRef());
  
  useEffect(() => {  
    divRef.current[0].current.style.display="inline-block";
    const timer = setInterval(() => {
      autoSlide(divRef.current)
    },3000);
    return () => clearInterval(timer);
  });

  return(<Box maxW="100%" w="100%" pos="relative" flexBasis="100%">
      <Stack pos="relative" w="100%" display="block">
        <ImageSlides ref={divRef.current[0]} image="image1"/>
        <ImageSlides ref={divRef.current[1]} image="image2"/>
        <SliderNavigator refer={divRef} icon={GrFormPrevious} value={-1} />
        <SliderNavigator refer={divRef} icon={GrFormNext} right={5} value={1}/>
      </Stack>
    </Box>);
}
