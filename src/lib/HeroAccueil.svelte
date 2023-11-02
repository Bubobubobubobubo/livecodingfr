<hero>
  <div
    class="hero min-h-screen bg-base-200 background-animate bg-gradient-to-r
    from-pink-500
    via-red-500
    to-yellow-500
    background-animate
"
  >
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-6xl text-center text-white font-bold uppercase">
          Livecoding.fr
        </h1>
      </div>
    </div>
  </div>
</hero>

<style>
  .background-animate {
    background-size: 400%;

    -webkit-animation: AnimationName 9s ease infinite;
    -moz-animation: AnimationName 9s ease infinite;
    animation: AnimationName 9s ease infinite;
  }

  @keyframes AnimationName {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
</style>
