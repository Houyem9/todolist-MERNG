'use client'

import React from 'react'
import UpdateTask from './UpdateTask';
import { DeleteTask, DeleteAllTask } from './DeleteTask';
import { HStack, Box, VStack, Flex, Text, StackDivider, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

interface taskList{
    tasks: any
    loading: Boolean
    error: any
    updateTask :any
    deleteTask: any
    deleteTaskAll: any
    checkTask: any
    loadingOfOneTask: any
    updateLoading: any
}
function TaskList({ tasks, loading, error, updateTask, deleteTask, deleteTaskAll, checkTask , loadingOfOneTask, updateLoading}:taskList) {


    if(loading || loadingOfOneTask || updateLoading){
        return <Image src={`../images/loading.gif`}/>
    }
    if (!tasks?.length || error) {
        return (
            <>
            <Tag mt='20' p='5' variant='outline' colorScheme='gray'>
                <TagLabel>No Tasks</TagLabel>
                <TagRightIcon  />
            </Tag>
                <Box maxW='80%'>
                    <Image mt='20px' w='98%' maxW='350' src={`../images/empty-box.png`} alt='Your list is empty' />
                </Box>
            </>
        );
    }
  return (
      <>
        <VStack
            divider={<StackDivider />}
            borderColor='gray.100'
            borderWidth='2px'
            p='5'
            borderRadius='lg'
            w='100%'
            maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
            alignItems='stretch'
            >
            
            {tasks.map((task:any) =>(
                <HStack
                key={task._id}
                opacity={task.check == true ? '0.2' : '1'}
                >
                    <Text
                        w='100%' 
                        p='8px'
                        borderRadius='lg'
                        as={task.check == true ? 's' : undefined}
                        cursor='pointer'
                        onClick={() => checkTask(task._id)}>
                        {task.title}
                    </Text>
                    <DeleteTask task={task} deleteTask={deleteTask} deleteTaskAll={deleteTaskAll} />
                    <UpdateTask task={task} updateTask={updateTask} />
                </HStack>
            ))}    
        </VStack>

        <Flex>
            <DeleteAllTask deleteTaskAll={deleteTaskAll} />
        </Flex>
    </>
  );
}

export default TaskList;