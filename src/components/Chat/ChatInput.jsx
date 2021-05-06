import { Button } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { db } from '../../firebase'
import { ChatInputContainer } from './chat.style'
import firebase from 'firebase'


export const ChatInput = ({channelName, channelId}) => {
    const [input, setInput] = useState('')

    // console.log(channelId)

    const sendMessage = (e) => {
        e.preventDefault()

        console.log(channelId)

        if(!channelId){
            return false
        }
         
        db.collection('rooms').doc(channelId).collection('message').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: 'Memi Nika',
            userImage: 'https://www.itl.cat/pngfile/big/64-647505_fate-kaleid-liner-prisma-illya-2wei-herz-fate.jpg'
        })

        setInput('')
    }

    return (
        <ChatInputContainer>
            <form>
                <input 
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder={`Message #ROOM`}
                />
                <Button 
                    type='submit' 
                    onClick={sendMessage}
                    hidden 
                >Send</Button>
            </form>
        </ChatInputContainer>
    )
}
