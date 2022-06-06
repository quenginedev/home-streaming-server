<script>
    import {useMedia} from "../hooks/use-media";
    import axios from 'axios'

    const {setMediaPath} = useMedia()
    let mediaPath = 'localhost:5000'
    const handleConnectClick = async () => {
      if (mediaPath) {
        try {
          const url = `http://${mediaPath}`
          await axios.get(url)
          setMediaPath(url)
        } catch (e) {
          console.error( e)
        }
      }
    }
</script>

<div class="flex items-center justify-center h-screen ">
    <div class="bg-white rounded-2xl border shadow-xl p-10 max-w-lg">
        <div class="flex flex-col items-center space-y-4">
            <h1 class="font-bold text-2xl text-gray-700 w-4/6 text-center">Setup</h1>
            <p class="text-sm text-gray-500 text-center w-5/6">
                Enter your Home Flixer Server URL Address or IP Address
            </p>
            <input
                    bind:value={mediaPath}
                    type="text" placeholder="Address or IP eg. localhost:5000"
                    class="border-2 rounded-lg w-full h-12 px-4"
            >
            <button on:click={handleConnectClick}
                    class="bg-blue-400 text-white rounded-md font-semibold px-4 py-3 w-full">Connect
            </button>
        </div>
    </div>

</div>