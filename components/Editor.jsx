import dynamic from 'next/dynamic'

import { useState } from 'react'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

export default function Editor() {
    const [value, setValue] = useState('')
    function createMarkup() {
        return { __html: value };
    }
    return (
        <>
            <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' style={{ minHeight: '150px' }} value={value} onChange={setValue} formats={formats} theme="snow" />
        </>
    )
}