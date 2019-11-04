<template>
  <div class="container">
    <div class="title">Quizlunch</div>
    
    <div class="quiz-area">
    
      <div class="quiz-left">

      </div>
      <div class="quiz-wrapper">
        <div class="top">
          <!-- <div class="qt-index">#1</div> -->
          <div class="qt-title">아브라카타브라 - C</div>
          <div class="qt-money">19999 ￦</div>
        </div>
        <div class="middle">
          <div class="qm-content-wrapper">
            <div class="qm-content">1+1=?</div>
          </div>
        </div>
        <div class="bottom">
          - made by abc
        </div>
      </div>
      <div class="quiz-right">

      </div>
    </div>
    <div class="comment-area">
      <div class="c-input">
        <div class="ci-textarea">입력공간조오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오온나긺</div>
        <div class="ci-cushion"></div>
        <div class="ci-password">******</div>
        <div class="ci-cushion"></div>
        <div class="ci-submit">Enter</div>
      </div>
      <div class="c-container">
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">이거 나 답 앎</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅋㅋㅋ이걸 못마추네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
        <div class="cc-comment">
          <div class="comment-nickname">무슨무슨닉네임</div>
          <div class="comment-context">ㅁㅊ; 문제 ㅈㄴ 개떡같이 잘만들었네</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'quizlunch_main',
  data() {
    return {
      baseURL: {
        db : 'http://db.api.quizlunch.com',
        rng : 'http://rng.api.quizlunch.com'
      }
    }
  },
  mounted(){
    var options = {
      params: {
        quizID: 1
      }
    }

    axios.get(`${this.baseURL['db']}/comment`, options).then((res)=>{
      console.log(res.data)
    })
  },
  method: {
  }
}
</script>

<style lang="scss">
.container {
  
  // padding: 0 3rem;

  .title {
    padding: 2rem 0;
    text-align: center; //dev
    font-size: 2rem;
  }

  .quiz-area {
    display: flex;
    align-content: center;

    .quiz-left {
      flex-basis: 2rem;
      height:2rem;
      width:2rem;

      border: 0.5rem solid #616161;
      border-radius: 2rem;
      margin: auto 0.5rem;   
    }
    .quiz-right {
      flex-basis: 2rem;
      height:2rem;
      width:2rem;

      border: 0.5rem solid #616161;
      border-radius: 2rem;
      margin: auto 0.5rem;  
    }
    .quiz-wrapper {
      flex: auto;
      display: flex;
      flex-direction: column;

      text-align: center;

      border: 3px solid #616161; // devl
      border-radius: 1rem;
      .top {
        flex: 1;
        display: flex;

        padding: 1rem 0;
        
        .qt-title {
          flex: auto;
        }
        .qt-money {
          flex-basis: 6rem;

          padding-right: 1rem;
          border-left: 1px solid #616161;

          text-align: right;
          // font-size: 1.5rem;
        }
      }
      
      .middle {
        flex: 1;

        .qm-content-wrapper {
          display: flex;
          min-height: 10rem;
          align-items: center;
          justify-content: center;

          .qm-content {

          }

        }
      }

      .bottom {
        flex: 1;

        padding: 0.5rem 0;
        margin: 0 1rem;

        color: #999;
        font-size: 0.5rem;
        text-align: right;
      } // bottom
    } // quiz-wrapper

  } // quiz-area
  .comment-area {

    margin: 0 2rem;

    font-size: 0.75rem;
    .c-input {
      display: flex;
      
      margin-top: 1rem;
      .ci-textarea {
        flex: auto;
        
        padding: 0 0.5rem;
        border-left: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-top: 3px solid #616161;
        border-radius: 1rem 0 0 1rem;
      }

      .ci-password {
        flex-basis: 4rem;
        
        padding: 0 0.5rem;
        border-left: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-top: 3px solid #616161;
        border-radius: 1rem 0 0 1rem;
      }

      .ci-submit {
        flex-basis: 4rem;
        
        padding: 0 0.5rem;
        border: 3px solid #616161;
        border-radius: 1rem;

        text-align: center;
      }
      
      .ci-cushion {
        border-left: 3px solid #616161;
        margin-right: 0.5rem;
      }

    }

    .c-container {
      .cc-comment {
        display: flex;

        margin-top: 0.5rem;
        .comment-nickname {
          flex-basis: 6rem;

          padding: 0 0.5rem;
          border-right: 2px solid #616161;

          text-align: center;
        }
        .comment-context {
          flex: 5;

          padding: 0 0.5rem;

          text-align: left;
        }
      }
    } // c-container
  } //comment-area
}
</style>
  