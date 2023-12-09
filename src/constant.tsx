import backlogImg from '../public/status-backlog.svg'
import todoImg from '../public/status-todo.svg'
import inprogressImg from '../public/status-inprogress.svg'
import doneImg from '../public/status-done.svg'
import canceledImg from '../public/status-canceled.svg'

import p0 from '../public/p-0.svg'
import p1 from '../public/p-1.svg'
import p2 from '../public/p-2.svg'
import p3 from '../public/p-3.svg'
import p4 from '../public/p-4.svg'

export const colorArray = [
  '#FF5733', // Orange
  '#3498DB', // Blue
  '#2ECC71', // Green
  '#E74C3C', // Red
  '#9B59B6', // Purple
  '#F39C12', // Yellow
  '#1ABC9C', // Turquoise
  '#34495E', // Dark Blue
  '#ECF0F1', // Light Grey
  '#D35400', // Pumpkin
]

export const statusImage: Record<string, string> = {
  'Backlog': backlogImg,
  'Todo': todoImg,
  'In progress': inprogressImg,
  'Done': doneImg,
  'Canceled': canceledImg,
}

export const priorities: Record<string, { img: string; label: string }> = {
  '0': { img: p0, label: 'No Priority' },
  '4': { img: p4, label: 'Urgent' },
  '1': { img: p1, label: 'Low' },
  '2': { img: p2, label: 'Medium' },
  '3': { img: p3, label: 'Hight' },
}

export function swapElements(arr: any[], index1: number, index2: number) {
  if (
    index1 < 0 ||
    index1 >= arr.length ||
    index2 < 0 ||
    index2 >= arr.length ||
    index1 === index2
  ) {
    // Indices out of bounds or equal, no need to swap
    return [...arr]
  }

  // Create a new array to avoid modifying the original array
  const result = [...arr]

  // Swap elements
  const temp = result[index1]
  result[index1] = result[index2]
  result[index2] = temp

  return result
}

export const TICKETS = [
  {
    id: 'CAM-1',
    title: 'Update User Profile Page UI',
    tag: ['Feature request'],
    userId: 'usr-1',
    status: 'Todo',
    priority: 4,
  },
  {
    id: 'CAM-2',
    title:
      'Add Multi-Language Support - Enable multi-language support within the application.',
    tag: ['Feature Request'],
    userId: 'usr-2',
    status: 'In progress',
    priority: 3,
  },
  {
    id: 'CAM-3',
    title: 'Optimize Database Queries for Performance',
    tag: ['Feature Request'],
    userId: 'usr-2',
    status: 'In progress',
    priority: 1,
  },
  {
    id: 'CAM-4',
    title: 'Implement Email Notification System',
    tag: ['Feature Request'],
    userId: 'usr-1',
    status: 'In progress',
    priority: 3,
  },
  {
    id: 'CAM-5',
    title: 'Enhance Search Functionality',
    tag: ['Feature Request'],
    userId: 'usr-5',
    status: 'In progress',
    priority: 0,
  },
  {
    id: 'CAM-6',
    title: 'Third-Party Payment Gateway',
    tag: ['Feature Request'],
    userId: 'usr-2',
    status: 'Todo',
    priority: 1,
  },
  {
    id: 'CAM-7',
    title: 'Create Onboarding Tutorial for New Users',
    tag: ['Feature Request'],
    userId: 'usr-1',
    status: 'Backlog',
    priority: 2,
  },
  {
    id: 'CAM-8',
    title: 'Implement Role-Based Access Control (RBAC)',
    tag: ['Feature Request'],
    userId: 'usr-3',
    status: 'In progress',
    priority: 3,
  },
  {
    id: 'CAM-9',
    title: 'Upgrade Server Infrastructure',
    tag: ['Feature Request'],
    userId: 'usr-5',
    status: 'Todo',
    priority: 2,
  },
  {
    id: 'CAM-10',
    title: 'Conduct Security Vulnerability Assessment',
    tag: ['Feature Request'],
    userId: 'usr-4',
    status: 'Backlog',
    priority: 1,
  },
]

export const USERS = [
  {
    id: 'usr-1',
    name: 'Anoop sharma',
    available: false,
    color: '#9B59B6',
  },
  {
    id: 'usr-2',
    name: 'Yogesh',
    available: true,
    color: '#9B59B6',
  },
  {
    id: 'usr-3',
    name: 'Shankar Kumar',
    available: true,
    color: '#1ABC9C',
  },
  {
    id: 'usr-4',
    name: 'Ramesh',
    available: true,
    color: '#ECF0F1',
  },
  {
    id: 'usr-5',
    name: 'Suresh',
    available: true,
    color: '#E74C3C',
  },
]
