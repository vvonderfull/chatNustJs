<template>
  <div>
    <div v-if="name === 'admin'" class="message-admin">
      <p>{{text}}</p>
    </div>
    <div v-else class="message-common">
      <div class="message-text" :class="{owner}">
        <small>
          <strong>
            {{name}}
          </strong>
        </small>
        <p>
          {{text}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      text: String,
      owner: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .message-admin {
    margin-bottom: 1rem;
    border-bottom: 2px solid #ffffff

    p {
      text-align center
      margin-bottom: 1rem
    }
  }

  .message-common {
    display: flex;
    flex-direction: column;

    .message-text {
      padding: 1rem;
      width: 60%;
      margin: 0 1rem;
      box-shadow: 0 1px 0 0 rgba(50, 50, 50, .3)
      border-radius: 4px;
      background-color: #1976d2;
      position: relative;
      margin-bottom: 1rem;

      p {
        margin-bottom: 0;
      }
    }

    .owner {
      background-color: #ffffff;
      color: #000000;
      align-self: flex-end;
    }
  }
</style>
