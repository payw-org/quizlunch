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
      <form class="c-input" v-on:submit.prevent="postComment();">
        <input class="ci-textarea" type="textarea" v-model="commentTextarea" required>
        <div class="ci-cushion"></div>
        <input class="ci-password" type="password" v-model="commentPassword" required minlength="4">
        <div class="ci-cushion"></div>
        <input class="ci-submit" type="submit" value="Enter">
      </form> 
      <form action=""></form>
      <div class="c-container">
        <div class="cc-comment" v-for="comment in comments" v-bind:key="comment.commentID">
          <div class="comment-nickname">{{ comment.nickname }}</div>
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
        db : 'http://db.api.quizlunch.com',
        rng : 'http://rng.api.quizlunch.com'
      },
      quizID: 1,
      comments: [],
      commentTextarea: '',
      commentPassword: ''
    }
  },
  mounted(){
    var renewInterval = setInterval(()=>{
      this.renewComments() 
    },100)
  },
  methods: {
    renewComments() {
      const url = `${this.baseURL['db']}/comment/${this.quizID}`
      axios.get(url).then((res)=>{
        this.comments = res.data.reverse().slice(0,20)
      })
    },
    async postComment(){
      const url = `${this.baseURL['db']}/comment/`
      var body = {
        quizID: '',
        nickname: '',
        text: '',
        password: '',
        ip: ''
      }//quizID need to fix
      body['quizID'] = this.quizID
      body['text'] = this.commentTextarea
      body['password'] = this.commentPassword
      body['ip'] = await axios.get('https://api.ipify.org')
      this.commentTextarea = ''
      this.commentPassword = ''
      await axios.post(url, body)
    }
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
    padding-bottom: 1rem;
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

    font-size: 0.75rem;
    .c-input {
      display: flex;
      
      margin: 0 2rem;
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
        min-width: 0; // override min-width: auto
        
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
      margin: 0 0.5rem;
      .cc-comment {
        display: flex;

        margin-top: 0.5rem;
        .comment-nickname {
          flex-basis: 5rem;

          padding: 0 0.5rem;
          border-right: 2px solid #616161;

          text-align: left;
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
  