import './App.css';
import { useState } from 'react';

function App() {
  let [글제목, 수정글제목] = useState(['남자 코드 추천', '강남 우동맛집', '파이썬 독학'])
  let [내용, 수정내용] = useState(['2월 17일 발생', '2월 10일', '2월 1일'])
  let [좋아요, 수정좋아요] = useState([0, 2, 4]);
  let [modal, setModal] = useState(false);
  let [글제목인덱스, set글제목인덱스] = useState(null);
  let [입력값, set입력값] = useState('');

  function 좋아요함수() {
    수정좋아요(좋아요+1);
  }

  function 수정글제목함수() {
    let copy수정글제목 = [...글제목];
    copy수정글제목[0] = '여자코트 추천';
    수정글제목(copy수정글제목);
  }

  function 글제목추가함수() {
    let copy글제목 = [...글제목];
    copy글제목.unshift(입력값);
    수정글제목(copy글제목);
    set입력값('');
  }

  function 글제목삭제함수(index) {
    let copy글제목 = [...글제목];
    copy글제목 = copy글제목.filter((_, i) => copy글제목[i] !== 글제목[index])
    수정글제목(copy글제목);
    set입력값("")
  }

  return (
    <div className="App">
      <header>
        <h1 className='nav__black' style={ {color : 'red', fontSize : '30px'} }>블로그</h1> 
      </header>
      <button 
        onClick={()=>{
          let 정렬글제목 = [...글제목];
          정렬글제목.sort()
          수정글제목(정렬글제목)
        }}>가나다순정렬
      </button>
      <button 
        onClick={()=>{
        let 복사글제목 = [...글제목];
        복사글제목[0] = '여자 코트 추천';
        수정글제목(복사글제목);
        }}>글제목 수정
      </button>
      <div className='lists'>
        {
          글제목.map((item, index)=>{
            return (
              <div className='list' key={index}>
                  <h4 className='title' 
                    onClick={()=>{
                      setModal(!modal)
                      set글제목인덱스(index);
                    }}>{ item }
                    <span 
                      className='good-btn' 
                      onClick={ (e)=>{
                        e.stopPropagation();
                        let copy좋아요 = [...좋아요];
                        copy좋아요[index] = 좋아요[index]+1
                        수정좋아요(copy좋아요)
                      } } >❤️
                    </span> { 좋아요[index] } 
                  </h4>
                <p>{ 내용[index] }</p>
                <button 
                  className='delete-btn' 
                  onClick={()=>{
                    글제목삭제함수(index);
                    }}>삭제
                </button>
              </div>
            )
          })
        }
      </div>
      <input 
        type="text" 
        onChange={(e)=>{ set입력값(e.target.value)}}
        value={입력값} 
      />
      <button type='submit' onClick={()=>{글제목추가함수()}}>추가</button>
      { 
        // modal && <Modal/>
        modal === true ? <Modal 글제목={글제목} color={'skyblue'} 수정글제목함수={수정글제목함수} 글제목인덱스={글제목인덱스}/> : null  
      }
    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal' style={{background: props.color}}>
        <h4>{props.글제목[props.글제목인덱스]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button 
          onClick={()=>{
            props.수정글제목함수();
          }
        }>글수정</button>
    </div>
  )
}


// 리액트 옛날 문법
// class Profile extends React.Component {
//   constructor() {
//     super();
//     this.state = { name: 'Kim', age: 30 }
//   }
//
//  changeName = () => {
//    this.setState( {name: 'Park'} )
//  }
//
//   render() {
//     return (
//       <div>
//        <h3>프로필입니다</h3>
//        <p>저는 { this.state.name } 입니다.</p>
//        <button onClick={ ()=>{ this.setState( {name: 'Park'} ) }}>버튼</button>
//        <button onClick={ this.changeName }>버튼</button>
//       </div>
//     )
//   }
// }

export default App;
