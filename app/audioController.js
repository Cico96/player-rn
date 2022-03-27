//controllo se è la prima volta che viene avviato l'audio premendo sull'item
export const play = async (playback, uri) => {
    try{
        
        return await playback.loadAsync({ uri }, {shouldPlay: true});
    } catch (error) {
        console.log(error.message)
    }
}

//metto in pausa l'audio premendo sull'item
export const pause = async (playback) => {
    try{
        return await playback.setStatusAsync({shouldPlay: false})
    } catch (error) {
        console.log(error.message)
    }
}

//rimetto in play l'audio precedente
export const resume = async (playback) => {
    try{
        return await playback.playAsync();
    } catch (error) {
        console.log(error.message)
    }
}

//seleziono un altro audio diverso dal precedente

export const playNext = async (playback, uri) => {
    try {
        await playback.stopAsync();
        await playback.unloadAsync();
        return await play(playback, uri);
    } catch (error) {
        console.log(error.message);
    }
}