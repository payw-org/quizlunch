<template>
  <div class="container">
    <div class="title">
      <div class="logo" />uizLunch
    </div>
    
    <div class="quiz-area">
      <div class="quiz-left">

      </div>
      <div class="quiz-wrapper">
        <div class="top">
          <!-- <div class="qt-index">#1</div> -->
          <div class="qt-title"> {{ quiz.title}} </div>
          <div class="qt-money">19999 ￦</div>
        </div>
        <div class="middle">
          <div class="qm-content-wrapper" >
            <div class="qm-content">{{ quiz.information }}</div>
          </div>
        </div>
        <div class="bottom">
          - made by Quizlunch
        </div>
      </div>
      <div class="quiz-right">

      </div>
    </div>
    <div class="answer-area">
      <form class="a-input" v-on:submit.prevent="postAnswer();">
        <input class="ai-textarea" type="textarea" v-model="answerTextarea" required maxlength="80">
        <div class="input-cushion" />
        <input class="ai-submit" type="submit" value="Enter">
      </form> 
    </div>
    <div class="comment-area">
      <form class="c-input" v-on:submit.prevent="postComment();">
        <input class="ci-textarea" type="textarea" v-model="commentTextarea" required minlength="2" maxlength="80">
        <div class="input-cushion" />
        <input class="ci-password" type="password" v-model="commentPassword" required minlength="4">
        <div class="input-cushion" />
        <input class="ci-submit" type="submit" value="Enter">
      </form> 
      <div class="c-container">
        <div class="cc-comment" v-for="comment in comments" v-bind:key="comment.commentID">
          <div class="comment-info">
            <div class="comment-nickname">{{ comment.nickname }}</div>
            <div class="comment-time">{{ comment.time }}</div>
            <div class="comment-ip">{{ comment.ip }}.***.***</div>
            <form class="comment-delete" v-on:submit.prevent="deleteComment(comment.commentID);">
              <div class="cd-button" type="button"/>
            </form>
          </div>
          <div class="comment-context">{{ comment.text }}</div>
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
        db : 'https://db.api.quizlunch.com',
        rng : 'https://rng.api.quizlunch.com',
        db_ws: 'wss://db2.api.quizlunch.com'
      },
      quizID: 1,
      quiz: '',
      comments: [],
      commentTextarea: '',
      commentPassword: '',
      answerTextarea: ''
    }
  },
  mounted(){
    this.connectWS()
  },
  methods: {
    async postComment(){
      const url = `${this.baseURL['db']}/comment/`
      var body = {
        quizID: '',
        nickname: '',
        text: '',
        password: ''
      }//quizID need to fix
      body['quizID'] = this.quizID
      body['text'] = this.commentTextarea
      body['password'] = this.commentPassword
      this.commentTextarea = ''
      await axios.post(url, body)
    },
    async postAnswer(){ // need to fix
      const url = `${this.baseURL['db']}/${this.quizID}/${this.answerTextarea}`
      this.answerTextarea = ''
      await axios.get(url,(data)=>{
        console.log(data)
      })
    },
    async connectWS(){
      var ws = new WebSocket(this.baseURL['db_ws'])

      ws.onopen = (event)=>{
        console.log('connected')
      }

      ws.onmessage = (event)=>{
        var result = JSON.parse(event.data)
        console.log(result)
        if(result.comments){
          this.comments = result.comments
          console.log('get comments')
        }
        if(result.quiz){
          this.quiz = result.quiz
          console.log(this.quiz)
          console.log('get quiz')
        }
      }

      ws.onerror = (event)=>{
        console.log("Sever error message :" + event.data )
      }
      ws.onclose = (event)=>{
        console.log("Sever closed")
        ws = new WebSocket(this.baseURL['db_ws'])
      }
    }
  }
}
</script>

<style lang="scss">

.container {
  // padding: 0 3rem;
  .title {
    padding: 1.5rem 0;
    text-align: center; //dev
    font-size: 2.5rem;
    font-weight: 600;
    .logo {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.1rem;
      background: url('~assets/img/logo.svg') no-repeat;
    }
  }

  .quiz-area {
    
    display: flex;
    align-content: center;
    padding-bottom: 0.5rem;
    .quiz-left {
      flex-basis: 2rem;
      height:2rem;
      width:2rem;

      border: 0.3rem solid #616161;
      border-radius: 1rem;
      margin: auto 0.5rem;   
    }
    .quiz-right {
      flex-basis: 2rem;
      height:2rem;
      width:2rem;

      border: 0.3rem solid #616161;
      border-radius: 1rem;
      margin: auto 0.5rem;  
    }
    .quiz-wrapper {
      
      flex: auto;
      display: flex;
      flex-direction: column;

      text-align: center;

      // border: 3px solid #616161; // devl
      border-radius: 1rem;
      background: radial-gradient(63.13% 94.45% at 18.96% 20.51%, #FFFFFF 0%, #EEEEEE 100%);
      .top {
        flex: 1;
        display: flex;

        padding: 0.5rem 0;
        margin: 0 1rem;
        
        .qt-title {
          flex: auto;
          text-align: center;
        }
        .qt-money {
          flex-basis: 6rem;

          // border-left: 1px solid #616161;

          text-align: right;
          font-size: 0.9rem;
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

  .answer-area{
    padding-bottom: 2rem;
    .a-input {
      display: flex;
      
      margin: 0 8rem;
      .ai-textarea {
        flex: auto;
        min-width: 0; // override min-width: auto
        
        padding-left: 0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 3px solid #616161;
        border-right: 0px solid #616161;
        border-radius: 1rem 0 0 1rem;
        font-size: 1rem;
      }

      .ai-submit {
        flex-basis: 3rem;
        
        padding-left:0.3rem;
        padding-right:0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 0px solid #616161;
        border-right: 3px solid #616161;
        border-radius: 0 1rem 1rem 0;

        background:none;
        text-align: center;
        font-size: 0.8rem;
      }

    } //a-input
  } // answer-area

  .comment-area {

    font-size: 0.75rem;
    .c-input {
      display: flex;
      
      margin: 0 0.5rem;
      .ci-textarea {
        flex: auto;
        min-width: 0; // override min-width: auto
        
        padding-left: 0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 3px solid #616161;
        border-right: 0px solid #616161;
        border-radius: 1rem 0 0 1rem;
        font-size: 1rem;
      }

      .ci-password {
        flex-basis: 3rem;
        min-width: 0; // override min-width: auto
        
        padding: 0 0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 0px solid #616161;
        border-right: 0px solid #616161;
        border-radius: 0;
        font-size: 1rem;
      }

      .ci-submit {
        flex-basis: 3rem;
        
        padding-left:0.3rem;
        padding-right:0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 0px solid #616161;
        border-right: 3px solid #616161;
        border-radius: 0 1rem 1rem 0;

        background:none;
        text-align: center;
        font-size: 0.8rem;
      }

    }

    .c-container {
      margin: 0 0.5rem;
      .cc-comment {

        padding: 0.3rem 0;
        margin-top: 0.5rem;
        border-radius: 10px;
        background-color: #EFEFEF;
        align-items: center;

        .comment-info {
          display: flex;
          .comment-nickname {
            flex-basis: auto;

            padding: 0 0.5rem;
           
            font-weight: 400;
          }
          .comment-time {
            flex: auto;

            font-size: 0.7rem;
            color: #AAAAAA;
            text-align: left;
          }
          .comment-ip {
            flex-basis: 6rem;
            color: #EFEFEF;
            font-size: 0.7rem;
          }
          .comment-delete {
            flex-basis: 1.6rem;
            padding: 0 0.5rem;

            .cd-button {
              min-width: 0; // override min-width: auto
              min-height: 0; // override min-width: auto
              height: 0.6rem;
              width: 0.6rem;
              border: none;
              background: url('~assets/img/cancel.svg') no-repeat;
              background-size: cover;
            }
          }
        }
        .comment-context {
          flex: 5;

          padding: 0 0.5rem;

          text-align: left;
        } // comment-context
      } // cc-comment
    } // c-container
  } //comment-area

  .input-cushion {
    border-left: 1px solid #616161;
    border-right: 1px solid #616161;
  }
}
</style>
  