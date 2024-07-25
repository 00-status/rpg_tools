import { useEffect, useState } from "react";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import { SerializedGraph } from "graphology-types";
import { DirectedGraph } from "graphology";

import { convertAreasToEdges, convertAreasToNodes } from "./domain/graphUtil";
import { Dialogue } from "./domain/types";

type Props = {
    dialogues: Array<Dialogue>;
    onDialogueClick: (clickedArea: number) => void;
};

export const DialogueTreeGraph = (props: Props) => {
    const { dialogues, onDialogueClick } = props;

    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const loadgraph = useLoadGraph();

    // If the graph does NOT have any nodes yet,
    //      create existing nodes from the x/y values on each Dialogue.
    // else
    //      Create existingNodes from the x/y values on the graph.

    const existingNodes = sigma.getGraph().reduceNodes((acc, node, nodeAttributes) => {
        acc.set(
            Number(node),
            {
                x: nodeAttributes['x'],
                y: nodeAttributes['y']
            }
        );

        return acc;
    }, new Map());

    sigma.setSetting('labelColor', { color: '#FCFEFF' });

    useEffect(() => {
        const serializedGraph: SerializedGraph = {
            attributes: { name: 'Adventure' },
            options: {
                allowSelfLoops: true,
                multi: false,
                type: 'directed'
            },
            nodes: convertAreasToNodes(dialogues, existingNodes),
            edges: convertAreasToEdges(dialogues)
        };
        const graph = DirectedGraph.from(serializedGraph);

        loadgraph(graph);
    }, [loadgraph, dialogues]);

    useEffect(() => {
        registerEvents({
            clickNode: (event) => {
                event.preventSigmaDefault();
                onDialogueClick(Number(event.node));
            },
            downNode: (event) => {
                setDraggedNode(event.node);
            },
            mouseup: (event) => {
                if (draggedNode) {
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
