<script>
import axios from 'axios'

export default {
  name: 'quizlunch_post_quiz',
  data() {
    return {
      baseURL: {
        db : 'https://db.api.quizlunch.com'
      },
      title: '',
      picture: [],
      information: '',
      answer: '',
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