import React, {useEffect, useRef, useState} from 'react';

let queue: QElement[] = [
    {
        a: { value: 50, datetime: '' },
        b: { value: 20, datetime: '' },
        c: { value: 120, datetime: '' }
    }
];

interface QElement {
    a: { value: number, datetime: any }
    b: { value: number, datetime: any }
    c: { value: number, datetime: any }
}

let previous = {
    a: 50,
    b: 20,
    c: 120
};

export default function LiveLineChart() {

    let socket = new WebSocket("ws://localhost:7071/data/pump1");
    socket.onopen = function () {
        console.log("asdf");
    };
    socket.onerror = function (error) {
        console.error(error);
    }
    socket.onmessage = function (event) {
        let data2 = JSON.parse(event.data);
        if (data2.x !== 'data') {
            console.log("Received " + data2.x);
            return;
        }
        data2 = data2.p;

        queue.push({
            a: data2[0],
            b: data2[1],
            c: data2[2]
        });
    }

    function drawLine(initialQueueLength: number, i: number, current: QElement, accessor: 'a' | 'b' | 'c', ctx: CanvasRenderingContext2D, strokeStyle: string) {
        if (accessor === 'c') current.c.value *= 10;

        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineTo((699 - initialQueueLength) + i, previous[accessor]);
        previous[accessor] = 500 - current[accessor].value;
        ctx.lineTo((700 - initialQueueLength) + i, previous[accessor]);
        ctx.closePath()
        ctx.stroke();
        ctx.fill();
    }

    let canvasRef = useRef<HTMLCanvasElement>(null);
    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        const initialQueueLength = queue.length;
        if (initialQueueLength === 0) return;

        ctx.globalCompositeOperation = "copy";
        ctx.drawImage(ctx.canvas,-initialQueueLength, 0);
        ctx.globalCompositeOperation = "source-over"
        ctx.lineWidth = 2;

        for (let i = 0; i < initialQueueLength; i++) {
            const current = queue.shift() as QElement;
            if (!current) break;
            console.log(current);

            drawLine(initialQueueLength, i, current, 'a', ctx, '#1ba300');
            drawLine(initialQueueLength, i, current, 'b', ctx, '#004a94');
            drawLine(initialQueueLength, i, current, 'c', ctx, '#a700d5');
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        let frameCount = 0;
        let animationFrameId: number;
        const render = () => {
            frameCount++;
            draw(context!, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas style={{width: '700px', height: '500px', border: '2px solid black'}} width={700} height={500} ref={canvasRef}></canvas>
    );
}
