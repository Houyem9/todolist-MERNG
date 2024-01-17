'use client'
import { useState } from 'react'
import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../../graphql/mutations/addTask';
// import { nanoid } from 'nanoid';

function AddTask({ addTask }: any) {
    const toast = useToast();
    const [content, setContent] = useState('');
    const [statusInput, setStatusInput] = useState(true);
    
    // use mutation of add task
    const [addNewTask, { loading }] = useMutation(ADD_TASK)

    function handleSubmit(e: any) {
        e.preventDefault();

        const taskText = content.trim();

        if (!taskText) {
            toast({
                title: 'Enter your task',
                position: 'top',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            setStatusInput(false);

            return setContent('');
        }

        // add new task in DB using graphql
        addNewTask({
            variables: {
                title: taskText
            }, onCompleted: (data) => {
                const task = {
                    _id: data.addNewTask._id,
                    title: taskText,
                    check: false
                };
                addTask(task);
            }, onError: () => {
                toast({
                    title: 'Can not Add this task.',
                    position: 'top',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                });
            }
        })

        setContent('');
    }

    if (content && !statusInput) {
        setStatusInput(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt='4' mb='4'>
                <Input
                    h='46'
                    borderColor={!statusInput ? 'red.300' : 'transparent'}
                    variant='filled'
                    placeholder='Write here'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button
                    colorScheme='blue'
                    px='8'
                    pl='10'
                    pr='10'
                    h='46'
                    isLoading={loading}
                    type='submit'>Add</Button>
            </HStack>
        </form>
    );
}

export default AddTask;