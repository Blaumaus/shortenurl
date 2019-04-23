<template>
  <div class="main">
    <header>
      <img src="../assets/logo.png" alt="Logo">
      <div id="actions">
        <a href="#" title="In development">Login</a>
        <a href="#" title="In development">Signup</a>
      </div>
    </header>
    <div id="content">
      <div>
        <p id="big">Short your loooong URL for free with our service</p>
        <p id="desc">Tracking and others features are waiting for you after registration</p>
      </div>
      <div id="form_container">
        <form @submit.prevent="sendData">
          <input
            v-model="url"
            id="url"
            type="text"
            placeholder="Write a link to short it"
            value=""
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            required
          > <br>
          <input id="submit" type="submit" value="SHORT">
        </form>
        <p>
          By clicking SHORT, you are agreeing to our
          <a href="#">Terms of Service</a> and
          <a href="#">Privacy Policy</a>
        </p>
      </div>
      <div id="error">
        <p>Unable to short your link. It's not a valid URL.</p>
      </div>
      <div id="success">
        <p>Your short link: <span id="readyUrl" @click="copyUrl" title="Click to copy">https://uri.vg/<span id="link"></span></span></p>
      </div>
    </div>
    <!-- <footer></footer> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'main',
  data: () => {
    return {
      url: ''
    }
  },
  methods: {
    async sendData() { 
      await axios({
        url: 'http://localhost:3000/api',
        method: 'post',
        data: {
          url: this.url
        }
      })
      .then(res => {
        function showError() {
          let errorbox = document.querySelector("#error")

          errorbox.style.display = 'grid'
          setTimeout(() => {
            errorbox.style.display = 'none'
          }, 3000)
        }

        if (res.data.state === 'success') {
          document.querySelector('#link').innerHTML = res.data.short_urn
          document.querySelector('#success').style.display = 'grid'
        }
        else showError()
      })
      .catch(err => {
        (function () {
          let errorbox = document.querySelector("#error")
          document.querySelector('#success').style.display = 'none'
          errorbox.style.display = 'grid'
          setTimeout(() => {
            errorbox.style.display = 'none'
          }, 3000)
        })();
      })
    },

    copyUrl() {
      let url = document.querySelector('#readyUrl')
      let urn = document.querySelector('#link').innerHTML
      let link = `https://uri.vg/${urn}`
      navigator.clipboard.writeText(link).then(function() {
        url.style.color = 'hsl(229, 100%, 23%)'
        setTimeout(() => {
          url.style.color = 'hsl(224, 71%, 33%)'
        }, 1000)
      }, function() {
        url.style.color = 'hsl(0, 84%, 48%)'
        setTimeout(() => {
          url.style.color = 'hsl(224, 71%, 33%)'
        }, 1000)
      });
    }
  }
}
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Montserrat:700");
  @import url("https://fonts.googleapis.com/css?family=Open+Sans");

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
  }

  .main {
    display: grid;
    grid-template-areas:
      "header"
      "content";
    /* "footer"; */
    grid-template-rows: 75px auto;
    grid-gap: 100px;
  }

  header {
    display: grid;
    grid-area: header;
    grid-template-areas: "logo actions";
    grid-template-columns: 65px auto;
    grid-gap: 20px;
    align-items: center;
    background-color: hsl(228, 6%, 16%);
  }

  header > img {
    grid-area: logo;
    height: 65px;
    width: auto;
    margin-left: 15px;
  }

  #actions {
    grid-area: actions;
    justify-self: right;
  }

  #actions > a {
    margin-right: 2vw;
    font-weight: bold;
    font-size: 25px;
    cursor: not-allowed;
    transition: all .2s ease;
  }

  #actions > a:hover {
    color: hsl(231, 62%, 54%)
  }

  p, a {
    color: azure;
  }

  #big {
    font-size: 40px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }

  #desc {
    font-family: "Open Sans", sans-serif;
    font-size: 24px;
  }

  #content {
    display: grid;
    grid-gap: 30px;
    grid-area: content;
    text-align: center;
  }

  br { display: none }

  #url {
    height: 50px;
    width: 35vw;
    border-radius: 8px;
    padding: 0 20px;
    font-size: 18px;
    border: 1px solid hsl(0, 0%, 74%);
  }

  #url:focus {
    box-shadow: 0 0 12px hsl(221, 65%, 59%);
  }

  #submit {
    height: 54px;
    width: 10vw;
    background: hsl(223, 72%, 32%);
    color: hsl(0, 0%, 89%);
    border-radius: 8px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    transition: all .4s ease;
  }

  #submit:hover {
    background: hsl(223, 56%, 52%);
    color: hsl(0, 0%, 94%);
  }

  #form_container > p {
    margin-top: 5px;
    color: hsl(223, 10%, 63%);
  }
  #form_container > p a {
    color: hsl(223, 10%, 63%);
  }

  #error {
    display: none;
    justify-self: center;
    align-items: center;
    font-family: "Open Sans", sans-serif;
    font-size: 24px;
    font-weight: bold;
    border-radius: 8px;
    width: calc(45vw + 40px);
    height: 50px;
    background-color: hsl(0, 70%, 65%);
  }

  #success {
    display: none;
    justify-self: center;
    align-items: center;
    font-family: "Open Sans", sans-serif;
    font-size: 24px;
    font-weight: bold;
    border-radius: 8px;
    width: calc(45vw + 40px);
    height: 50px;
    background-color: hsl(118, 58%, 31%);
  }

  #readyUrl {
    color: hsl(224, 71%, 33%);
    text-decoration: underline;
  }

  @media (max-width: 1300px) {
    br { display: block }
    #submit { width: 600px }
    #url { width: 560px }
    #success { width: 600px }
    #error { width: 600px }
  }

  @media (max-width: 700px) {
    br { display: block }
    #submit { width: 400px }
    #url { width: 360px }
    #success { 
      width: 400px;
      font-size: 18px; 
    }
    #error { 
      width: 400px;
      font-size: 18px; 
    }
  }

  @media (max-width: 430px) {
    br { display: block }
    #submit { width: 90vw }
    #url { width: calc(90vw - 40px) }
    #success { 
      width: 90vw;
      font-size: 18px; 
    }
    #error { 
      width: 90vw;
      font-size: 18px; 
    }
  }

  @media (max-width: 360px) {
    #big { font-size: 25px }
    #desc { font-size: 15px }
    #form_container > p { font-size: 13px }
    #actions > a { font-size: 15px }
    #success { font-size: 15px; }
    #error { font-size: 15px; }
  }

  /* footer {
            background-color: hsl(228, 6%, 16%);
          } */
</style>
