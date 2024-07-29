import { useEffect, useState } from "react";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import { SerializedGraph } from "graphology-types";
import { DirectedGraph } from "graphology";

import { convertDialoguesToEdges, convertDialoguesToNodes } from "./domain/graphUtil";
import { Dialogue, DialogueCoordinate } from "./domain/types";

type Props = {
    dialogues: Array<Dialogue>;
    dialogueCoordiantes: DialogueCoordinate;
    onDialogueClick: (dialogueID: number) => void;
    onDialogueMoveFinish: (dialogueID: number, x: number, y: number) => void;
};

export const DialogueTreeGraph = (props: Props) => {
    const { dialogues, dialogueCoordiantes, onDialogueClick, onDialogueMoveFinish } = props;

    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const loadgraph = useLoadGraph();

    sigma.setSetting('labelColor', { color: '#FCFEFF' });

    useEffect(() => {
        const serializedGraph: SerializedGraph = {
            attributes: { name: 'Adventure' },
            options: {
                allowSelfLoops: true,
                multi: false,
                type: 'directed'
            },
            nodes: convertDialoguesToNodes(dialogues, dialogueCoordiantes),
            edges: convertDialoguesToEdges(dialogues)
        };
        const graph = DirectedGraph.from(serializedGraph);

        loadgraph(graph);
    }, [loadgraph, dialogues]);

    useEffect(() => {
        registerEvents({
            clickNode: (event) => {
                event.preventSigmaDefault();
            },
            downNode: (event) => {
                setDraggedNode(event.node);
            },
            mouseup: (event) => {
                if (draggedNode) {
                    const nodeID = Number(draggedNode);

                    const position = sigma.viewportToGraph(event);
                    
                    onDialogueClick(nodeID);

                    setDraggedNode(null);
                }
            },
            mousedown: () => {
                if (!sigma.getCustomBBox()) {
                    sigma.setCustomBBox(sigma.getBBox());
                }
            },
            mousemove: (event) => {
                if (draggedNode) {
                    const position = sigma.viewportToGraph(event);
                    sigma.getGraph().setNodeAttribute(draggedNode, "x", position.x);
                    sigma.getGraph().setNodeAttribute(draggedNode, "y", position.y);

                    onDialogueMoveFinish(Number(draggedNode), position.x, position.y);

                    // Prevent sigma from moving the camera
                    event.preventSigmaDefault();
                    event.original.preventDefault();
                    event.original.stopPropagation();
                }
            }
        });
    }, [registerEvents, sigma, draggedNode, setDraggedNode]);

    return null;
};
