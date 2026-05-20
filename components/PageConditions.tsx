"use client";

type PageConditionProps = {
    loading: boolean,
    workerLength: number
    colspan: number
}

export default function PageCondition({ loading, workerLength, colspan }: PageConditionProps) {
    if (loading) {
        return (
            <tr>
                <td colSpan={colspan} className="text-center py-6">
                    Loading...
                </td>
            </tr>
        )
    }
    if (!loading && workerLength === 0) {
        return (
            <tr>
                <td
                    colSpan={colspan}
                    className="text-center py-6 text-gray-500"
                >
                    No Record Found
                </td>
            </tr>
        )
    }

}