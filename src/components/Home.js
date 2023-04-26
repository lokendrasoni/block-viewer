import React, { useCallback, useEffect, useState } from 'react';
import { ethers } from "ethers";
import Block from './Block';

export default function Home() {
    const [last_block_number, setBlockNumber] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [selected_block, setSelectedBlock] = useState(null);

    const getBlock = useCallback(async (provider) => {
        // const socket = new WebSocket("wss://mainnet.infura.io/ws/v3/c3af19888ca14fbb819f0795aed71283");
        const block_number = await provider.getBlockNumber();
        if (block_number !== last_block_number) {
            setBlockNumber(block_number);
            const block = await provider.getBlockWithTransactions(block_number);
            setBlocks(v => {
                if (v.length >= 10) {
                    v.pop();
                }
                return [block, ...v];
            });
        }
    }, [last_block_number]);

    useEffect(() => {
        const provider = new ethers.providers.InfuraProvider(null, "c3af19888ca14fbb819f0795aed71283");
        const interval = setInterval(() => {
            getBlock(provider);
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    }, [getBlock]);

    return (
        <>
            <center><h1>Block Viewer</h1>
                {
                    !selected_block ?
                        blocks.length ?
                            <table border={"black"}>
                                <thead>
                                    <tr>
                                        <th>Block Number</th>
                                        <th>Block Hash</th>
                                        <th>Gas Limit</th>
                                        <th>Transaction Count</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        blocks.map((block, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td onClick={() => setSelectedBlock(block)} style={{ textDecoration: "underline", cursor: "pointer" }}>{block.number}</td>
                                                    <td>{block.hash}</td>
                                                    <td>{parseInt(block.gasLimit)}</td>
                                                    <td>{block.transactions.length}</td>
                                                    <td>{block.timestamp}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                            : ""
                        : <Block block={selected_block} setSelectedBlock={setSelectedBlock} />
                }
            </center>
        </>
    );
};