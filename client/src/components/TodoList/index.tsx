
import { Heading, IconButton, VStack, useColorMode, useDisclosure, useToast, Link, Flex, Button } from "@chakra-ui/react";

import { FaSun, FaMoon, FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import AddTask from "./AddTask";
import TaskList from "./Tasks";
import { GET_TASKS } from "../../../graphql/queries/getTasks";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ONE_TASK } from "../../../graphql/mutations/deleteOneTask";
import { UPDATE_TASK } from "../../../graphql/mutations/updateTask";
import { useRouter } from 'next/navigation'

function TodoListComponent() {

    // graphql queries and mutations (GET, DELETE, UPDATE)
    const { data, loading, error } = useQuery(GET_TASKS)
    const [deleteOneTask, { loading: loadingOfOneTask }] = useMutation(DELETE_ONE_TASK)
    const [updateOneTask, { loading: updateLoading }] = useMutation(UPDATE_TASK)

    const toast = useToast();
    const [tasks, setTasks] = useState<any>(
        () => data ? data.getTasks || [] : []
    );

    useEffect(() => {
        setTasks(data?.getTasks)
    }, [data]);

    const router = useRouter()

    function deleteTask(_id: any) {
        deleteOneTask({
            variables: { _id: _id }, onCompleted: (data: any) => {
                const newTasks = tasks.filter((task: any) => {
                    return task._id !== _id;
                });
                setTasks(newTasks);
            }, onError: (e) => {
                toast({
                    title: 'Can not delete.',
                    description: "You can not delete this task.",
                    position: 'top',
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            }
        })

    }

    function deleteTaskAll() {
        setTasks([]);
    }

    function checkTask(_id: any) {

        const newTasksCheck = tasks.map((task: any, index: any, array: any) => {
            if (task._id === _id) {
                task.check = !task.check;
            }
            return task;
        });

        setTasks(newTasksCheck);
    }

    function updateTask(_id: any, title: String, onClose: any) {

        const info = title.trim();

        if (!info) {
            toast({
                title: 'Enter your task',
                position: 'top',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });

            return;
        }
        updateOneTask({
            variables: {
                _id: _id,
                title: title
            }, onCompleted: () => {
                console.log(tasks,"id")

                const newTasksUpdate = tasks.map((task: any, index:any) => {
                    if (task._id === _id) {
                        return { _id, title, check: false}
                    }
                    return task;
                });

                setTasks(newTasksUpdate);
                onClose();
            }, onError: (e) => {
                console.log(e)
                toast({
                    title: 'Can not update.',
                    position: 'top',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                });
                onClose()
            }
        })


    }

    function addTask(task: any) {
        setTasks([...tasks, task]);
    }

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <VStack p={4} minH='100vh' pb={28}>
            <IconButton
                icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                isRound={true}
                size='md'
                alignSelf='flex-end'
                onClick={toggleColorMode} aria-label={""} />
                <Button onClick={()=>{
                    router.push('/notifications')

                }}>Notifications</Button>

            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-l, teal.300, blue.500)'
                bgClip='text'
            >
                Todo List
            </Heading>
            <AddTask addTask={addTask} />
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} deleteTaskAll={deleteTaskAll} checkTask={checkTask} loading={loading} loadingOfOneTask={loadingOfOneTask} updateLoading={updateLoading} error={error} />

            <Flex position='absolute' bottom='5'>
                <Link href='https://github.com/Houyem9' target='_blank' >
                    <IconButton
                        icon={<FaGithub />}
                        isRound={true}
                        size='md'
                        m='1' aria-label={""} />
                </Link>
                <Link href='https://www.linkedin.com/in/houyem-haj-salem/' target='_blank'>
                    <IconButton
                        icon={<FaLinkedin />}
                        isRound={true}
                        size='md'
                        m='1' aria-label={""} />
                </Link>

            </Flex>
        </VStack>
    );
}

export default TodoListComponent;
