import React, { useEffect, useRef, useState } from 'react';
import './index.css'
import { NOTEMAP } from '../../constant'
import * as Tone from 'tone';
import midijson from '../../midi.json'

export const Canvas = (props) => {
  const { playing } = props;
  useEffect(() => {
    if (playing) {
      run()
    }
  }, [playing])

  const [ctx, setCtx] = useState(null);
  const ref = useRef(null);
  const posMap = {
    C1:[0, 0, 9, 151],
    D1:[10, 0, 9, 151],
    E1:[20, 0, 9, 151],
    F1:[30, 0, 9, 151],
    G1:[40, 0, 9, 151],
    A1:[50, 0, 9, 151],
    B1:[60, 0, 9, 151],
    // 
    'C-1':[5, 0, 8, 80],
    'D-1':[15, 0, 8, 80],
    'F-1':[35, 0, 8, 80],
    'G-1':[45, 0, 8, 80],
    'A-1':[55, 0, 8, 80],
    // 
    C2:[70, 0, 9, 151],
    D2:[80, 0, 9, 151],
    E2:[90, 0, 9, 151],
    F2:[100, 0, 9, 151],
    G2:[110, 0, 9, 151],
    A2:[120, 0, 9, 151],
    B2:[130, 0, 9, 151],
    // 
    'C-2':[75, 0, 8, 80],
    'D-2':[85, 0, 8, 80],
    'F-2':[105, 0, 8, 80],
    'G-2':[115, 0, 8, 80],
    'A-2':[125, 0, 8, 80],
    // 
    C3:[140, 0, 9, 151],
    D3:[150, 0, 9, 151],
    E3:[160, 0, 9, 151],
    F3:[170, 0, 9, 151],
    G3:[180, 0, 9, 151],
    A3:[190, 0, 9, 151],
    B3:[200, 0, 9, 151],
    // 
    'C-3':[145, 0, 8, 80],
    'D-3':[155, 0, 8, 80],
    'F-3':[175, 0, 8, 80],
    'G-3':[185, 0, 8, 80],
    'A-3':[195, 0, 8, 80],
  }
  const BLUE = '#1ba7d1'
  let count = -1;
  const draw = (ctx, note) => {
    count++
    if(count%4!==0 && count>0) return
    const width = ctx.width;
    const height = ctx.height;
    ctx.clearRect(0, 0, width, height)
    // 低音
    ctx.fillStyle = 'white';
    ctx.fillRect(...posMap['C1'])
    ctx.fillRect(...posMap['D1'])
    ctx.fillRect(...posMap['E1']);
    ctx.fillRect(...posMap['F1']);
    ctx.fillRect(...posMap['G1']);
    ctx.fillRect(...posMap['A1']);
    ctx.fillRect(...posMap['B1']);
    ctx.fillStyle = 'black';
    ctx.fillRect(...posMap['C-1']);
    ctx.fillRect(...posMap['D-1']);
    ctx.fillRect(...posMap['F-1']);
    ctx.fillRect(...posMap['G-1']);
    ctx.fillRect(...posMap['A-1']);

    // 中音
    ctx.fillStyle = 'white';
    ctx.fillRect(...posMap['C2'])
    ctx.fillRect(...posMap['D2'])
    ctx.fillRect(...posMap['E2']);
    ctx.fillRect(...posMap['F2']);
    ctx.fillRect(...posMap['G2']);
    ctx.fillRect(...posMap['A2']);
    ctx.fillRect(...posMap['B2']);
    ctx.fillStyle = 'black';
    ctx.fillRect(...posMap['C-2']);
    ctx.fillRect(...posMap['D-2']);
    ctx.fillRect(...posMap['F-2']);
    ctx.fillRect(...posMap['G-2']);
    ctx.fillRect(...posMap['A-2']);

    // 高音
    ctx.fillStyle = 'white';
    ctx.fillRect(...posMap['C3'])
    ctx.fillRect(...posMap['D3'])
    ctx.fillRect(...posMap['E3']);
    ctx.fillRect(...posMap['F3']);
    ctx.fillRect(...posMap['G3']);
    ctx.fillRect(...posMap['A3']);
    ctx.fillRect(...posMap['B3']);
    ctx.fillStyle = 'black';
    ctx.fillRect(...posMap['C-3']);
    ctx.fillRect(...posMap['D-3']);
    ctx.fillRect(...posMap['F-3']);
    ctx.fillRect(...posMap['G-3']);
    ctx.fillRect(...posMap['A-3']);
    const paint = NOTEMAP[note] || []
    paint.forEach(note => {
      const position = posMap[note] || [0, 0, 0, 0]
      ctx.fillStyle = BLUE;
      ctx.fillRect(...position)
    })
    // requestAnimationFrame(() => {
    //   draw(ctx)
    // })
  }
  const [sampler] = useState(new Tone.Sampler({
    urls: {
      A0: "A0.mp3",
      C1: "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      A1: "A1.mp3",
      C2: "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      A2: "A2.mp3",
      C3: "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      A3: "A3.mp3",
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
      C5: "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      A5: "A5.mp3",
      C6: "C6.mp3",
      "D#6": "Ds6.mp3",
      "F#6": "Fs6.mp3",
      A6: "A6.mp3",
      C7: "C7.mp3",
      "D#7": "Ds7.mp3",
      "F#7": "Fs7.mp3",
      A7: "A7.mp3",
      C8: "C8.mp3"
    },
    release: 10,
    baseUrl: "https://tonejs.github.io/audio/salamander/"
  }).toDestination())

  const run = async () => {
    const now = Tone.now()
    const piano = (player, notes) => {
      notes.map(note => {
        setTimeout(() => {
          draw(ctx, note.name)
          console.info('(ﾉ>ω<)ﾉ:',note.name,new Array(Number(note.name[note.name.length-1])).fill('  ').join('')+'|');
        }, (note.time + now +1) * 1000)
        player.triggerAttackRelease(
          note.name,
          note.duration,
          note.time + now + 1,
          note.velocity
        )
      })
    }
    const notes = midijson.tracks.map(track => track.notes).flat()
    piano(sampler, notes)
  }
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    setCtx(ctx);
    draw(ctx)
  }, [])
  return (
    <div className='piano-canvas'>
      <canvas ref={ref} id='canvas'></canvas>
    </div>
  )
}